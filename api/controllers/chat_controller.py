import asyncio
import logging
import time
import uuid
from typing import Any
from uuid import UUID

from fastapi.responses import StreamingResponse
from langgraph.graph.state import CompiledStateGraph

from api import enums, schemas, utilities


class ChatController:
    ###
    # private functions
    ###

    async def _build_chat_event_stream(
        self,
        agent: CompiledStateGraph,
        messages: list[dict[str, Any]],
        session_id: UUID,
    ):
        flush_interval_seconds = 0.03
        last_flush_time = time.monotonic()
        message_id = uuid.uuid4()
        pending_content: list[str] = []
        last_activity: enums.chat.AssistantActivityEnum | None = None

        try:
            async for chunk, metadata in agent.astream(
                {"messages": messages},
                stream_mode="messages",
            ):
                # 1. check for tool
                if utilities.agent.is_tool_call_chunk(chunk):
                    tool_name = utilities.agent.tool_name_from_chunk(chunk)
                    activity = utilities.chat.activity_from_tool_name(tool_name) if tool_name else None

                    if activity and activity.activity != last_activity:
                        yield self._to_sse(
                            schemas.chat.ChatStreamActivityEventSchema(
                                activity=activity.activity,
                                content=activity.content,
                                message_id=message_id,
                                session_id=session_id,
                            )
                        )

                        last_activity = activity.activity

                # 2. log tool result chunk
                if utilities.agent.is_tool_result_chunk(chunk):
                    logging.debug(chunk)

                    continue

                # 3. assistant answer chunk
                text = utilities.agent.text_from_chunk(chunk)

                if not text:
                    continue

                pending_content.append(text)
                current_time = time.monotonic()

                if current_time - last_flush_time >= flush_interval_seconds:
                    yield self._to_sse(
                        schemas.chat.ChatStreamTokenEventSchema(
                            content="".join(pending_content),
                            message_id=message_id,
                            session_id=session_id,
                        )
                    )

                    pending_content.clear()
                    last_flush_time = current_time

            if pending_content:
                yield self._to_sse(
                    schemas.chat.ChatStreamTokenEventSchema(
                        content="".join(pending_content),
                        message_id=message_id,
                        session_id=session_id,
                    )
                )

                pending_content.clear()

            yield self._to_sse(
                schemas.chat.ChatStreamDoneEventSchema(
                    message_id=message_id,
                    session_id=session_id,
                    timestamp=utilities.datetime.timestamp(),
                )
            )

        except asyncio.CancelledError:
            raise
        except Exception as exception:
            yield self._to_sse(
                schemas.chat.ChatStreamErrorEventSchema(
                    error=schemas.errors.BaseErrorResponseSchema(
                        code=500,
                        message=str(exception),
                    ),
                    message_id=message_id,
                    session_id=session_id,
                )
            )

    def _to_sse(self, event_model: Any) -> str:
        return f"data: {event_model.model_dump_json()}\n\n"

    ###
    # public functions
    ###

    async def chat(
        self,
        agent,
        content: str,
        session_id: UUID | None,
    ) -> schemas.chat.ChatResponseSchema:
        """
        ...

        Args:
            agent (CompiledStateGraph): The initialized LangChain agent.

        Raises:
        """
        _session_id = session_id or uuid.uuid4()
        result = await agent.ainvoke(
            {
                "messages": [
                    {
                        "role": enums.chat.MessageRoleEnum.USER,
                        "content": content,
                    }
                ]
            }
        )
        last = result["messages"][-1]
        response_content = getattr(last, "content", None)

        if not isinstance(response_content, str):
            response_content = str(response_content)

        return schemas.chat.ChatResponseSchema(
            messages=[
                schemas.chat.ChatMessageSchema(
                    content=response_content,
                    id=uuid.uuid4(),
                    role=enums.chat.MessageRoleEnum.ASSISTANT,
                    timestamp=utilities.datetime.timestamp(),
                )
            ],
            session_id=_session_id,
        )

    def chat_stream(
        self,
        agent: CompiledStateGraph,
        content: str,
        session_id: UUID | None,
    ) -> StreamingResponse:
        """
        ...

        Args:
            agent (CompiledStateGraph): The initialized LangChain agent.

        Raises:
        """
        _session_id = session_id or uuid.uuid4()
        messages = [
            {
                "role": enums.chat.MessageRoleEnum.USER,
                "content": content,
            }
        ]

        return StreamingResponse(
            self._build_chat_event_stream(
                agent=agent,
                messages=messages,
                session_id=_session_id,
            ),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        )
