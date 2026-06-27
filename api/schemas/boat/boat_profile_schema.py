from uuid import UUID

from pydantic import BaseModel, Field

from api import schemas


class BoatProfileSchema(schemas.defaults.BaseSchema):
    call_sign: str | None = None
    home_port: str | None = None
    hin: str = Field(..., min_length=1)
    id: UUID
    image_uri: str | None = None
    name: str = Field(..., min_length=1)
    year: int
