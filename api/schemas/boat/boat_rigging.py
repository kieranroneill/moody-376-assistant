from pydantic import BaseModel, Field


class BoatRigging(BaseModel):
    e_mm: int | None = None
    forestay_length_mm: int
    i_m: int | None = None
    j_m: int | None = None
    p_m: int | None = None
    type: str = Field(..., min_length=1)
