from uuid import UUID

from pydantic import BaseModel


class BaseChatStreamEvent(BaseModel):
    message_id: UUID
    session_id: UUID
