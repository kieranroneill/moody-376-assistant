from pydantic import BaseModel


class BoatDimensions(BaseModel):
    ballast_kg: int | None = None
    beam_mm: int
    displacement_kg: int | None = None
    draft_mm: int
    loa_mm: int
    lwl_mm: int
