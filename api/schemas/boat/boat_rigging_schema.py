from pydantic import BaseModel, Field


class BoatRiggingSchema(BaseModel):
    e_mm: int | None = None
    forestay_length_mm: int
    i_mm: int | None = None
    j_mm: int | None = None
    p_mm: int | None = None
    type: str = Field(..., min_length=1)
