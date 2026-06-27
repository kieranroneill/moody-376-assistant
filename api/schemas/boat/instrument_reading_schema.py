from uuid import UUID

from pydantic import Field

from api.schemas.defaults import BaseSchema


class InstrumentReadingSchema(BaseSchema):
    id: UUID
    label: str = Field(..., min_length=1)
    unit: str | None = None
    value: str = Field(..., min_length=1)
