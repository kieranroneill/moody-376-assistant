from uuid import UUID

from pydantic import BaseModel, Field

from .chat_message_schema import ChatMessageSchema


class ChatResponseSchema(BaseModel):
    messages: list[ChatMessageSchema] = Field(..., min_length=1)
    session_id: UUID
