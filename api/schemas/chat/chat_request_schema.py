from uuid import UUID

from pydantic import BaseModel, Field

from api import schemas


class ChatRequestSchema(schemas.defaults.BaseSchema):
    content: str = Field(..., min_length=1)
    session_id: UUID | None = None
