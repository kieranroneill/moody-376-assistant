from uuid import UUID

from pydantic import BaseModel, Field

from .chat_message import ChatMessage


class ChatResponse(BaseModel):
    messages: list[ChatMessage] = Field(..., min_length=1)
    session_id: UUID
