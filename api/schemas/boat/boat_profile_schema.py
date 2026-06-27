from uuid import UUID

from pydantic import Field

from api.schemas.defaults import BaseSchema


class BoatProfileSchema(BaseSchema):
    call_sign: str | None = None
    home_port: str | None = None
    hin: str = Field(..., min_length=1)
    id: UUID
    image_uri: str | None = None
    name: str = Field(..., min_length=1)
    year: int
