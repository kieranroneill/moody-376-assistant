from uuid import UUID

from pydantic import BaseModel, Field

from .message import Message


class Response(BaseModel):
    messages: list[Message] = Field(..., min_length=1)
    session_id: UUID
