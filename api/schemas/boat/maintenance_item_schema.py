from uuid import UUID

from pydantic import Field

from api.schemas.defaults import BaseSchema


class MaintenanceItemSchema(BaseSchema):
    due_label: str = Field(..., min_length=1)
    id: UUID
    title: str = Field(..., min_length=1)
    status: str = Field(..., min_length=1)
    system: str = Field(..., min_length=1)
