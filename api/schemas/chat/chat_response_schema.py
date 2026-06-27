from uuid import UUID

from pydantic import BaseModel, Field

from api import schemas

from .chat_message_schema import ChatMessageSchema


class ChatResponseSchema(schemas.defaults.BaseSchema):
    messages: list[ChatMessageSchema] = Field(..., min_length=1)
    session_id: UUID
