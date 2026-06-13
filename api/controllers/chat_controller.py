import asyncio
import uuid
from typing import Any
from uuid import UUID

from fastapi.responses import StreamingResponse

from api import enums, schemas


class ChatController:
    ###
    # private functions
    ###

    async def _build_chat_event_stream(
        self,
        agent: Any,
        messages: list[dict[str, Any]],
        session_id: UUID,
    ):
        try:
            async for chunk, metadata in agent.astream(
                {"messages": messages},
                stream_mode="messages",
            ):
                text = self._extract_chunk_text(chunk)

                if not text:
                    continue

                yield self._to_sse(
                    schemas.chat.ChatStreamTokenEvent(
                        session_id=session_id,
                        content=text,
                    )
                )

            yield self._to_sse(
                schemas.chat.ChatStreamDoneEvent(
                    session_id=session_id,
                )
            )

        except asyncio.CancelledError:
            raise
        except Exception as exception:
            yield self._to_sse(
                schemas.chat.ChatStreamErrorEvent(
                    session_id=session_id,
                    error=schemas.errors.BaseErrorResponse(
                        code=500,
                        message=str(exception),
                    ),
                )
            )

    def _extract_chunk_text(self, chunk: Any) -> str:
        """
        ...

        Args:
            chunk (Any): ...

        Returns:
            (str): Returns ...
        """
        content = getattr(chunk, "content", None)

        if isinstance(content, str):
            return content

        if isinstance(content, list):
            parts: list[str] = []

            for item in content:
                if isinstance(item, str):
                    parts.append(item)

                if isinstance(item, dict) and item.get("type") == "text":
                    text = item.get("text")

                    if isinstance(text, str):
                        parts.append(text)

            return "".join(parts)

        content_blocks = getattr(chunk, "content_blocks", None)

        if isinstance(content_blocks, list):
            parts: list[str] = []

            for block in content_blocks:
                if isinstance(block, dict) and block.get("type") == "text":
                    text = block.get("text")

                    if isinstance(text, str):
                        parts.append(text)

            return "".join(parts)

        return ""

    def _to_sse(self, event_model: Any) -> str:
        return f"data: {event_model.model_dump_json()}\n\n"

    ###
    # public functions
    ###

    async def chat(
        self,
        agent,
        message: str,
        session_id: UUID | None,
    ) -> schemas.chat.ChatResponse:
        """
        ...

        Args:
            agent (...): The initialized LangChain agent.

        Raises:
        """
        _session_id = session_id or uuid.uuid4()
        result = await agent.ainvoke(
            {
                "messages": [
                    {
                        "role": enums.chat.MessageRoleEnum.USER,
                        "content": message,
                    }
                ]
            }
        )
        last = result["messages"][-1]
        content = getattr(last, "content", None)

        if not isinstance(content, str):
            content = str(content)

        return schemas.chat.ChatResponse(
            messages=[
                schemas.chat.ChatMessage(
                    role=enums.chat.MessageRoleEnum.ASSISTANT,
                    content=content,
                )
            ],
            session_id=_session_id,
        )

    def chat_stream(
        self,
        agent,
        message: str,
        session_id: UUID | None,
    ) -> StreamingResponse:
        """
        ...

        Args:
            agent (...): The initialized LangChain agent.

        Raises:
        """
        _session_id = session_id or uuid.uuid4()
        messages = [
            {
                "role": enums.chat.MessageRoleEnum.USER,
                "content": message,
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
