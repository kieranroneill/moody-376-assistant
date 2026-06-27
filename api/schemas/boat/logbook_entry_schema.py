from uuid import UUID

from pydantic import Field

from api.schemas.defaults import BaseSchema


class LogbookEntrySchema(BaseSchema):
    author: str = Field(..., min_length=1)
    body: str = Field(..., min_length=1)
    id: UUID
    timestamp: str = Field(..., min_length=1)
    title: str = Field(..., min_length=1)
