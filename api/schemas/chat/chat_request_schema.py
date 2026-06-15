from uuid import UUID

from pydantic import BaseModel, Field


class ChatRequestSchema(BaseModel):
    content: str = Field(..., min_length=1)
    session_id: UUID | None = None
