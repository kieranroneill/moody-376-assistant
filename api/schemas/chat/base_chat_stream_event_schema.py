from uuid import UUID

from pydantic import BaseModel


class BaseChatStreamEventSchema(BaseModel):
    message_id: UUID
    session_id: UUID
