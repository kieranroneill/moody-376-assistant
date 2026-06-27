from pydantic import BaseModel, Field

from api import schemas


class BoatRiggingSchema(schemas.defaults.BaseSchema):
    e_mm: int | None = None
    forestay_length_mm: int
    i_mm: int | None = None
    j_mm: int | None = None
    p_mm: int | None = None
    type: str = Field(..., min_length=1)
