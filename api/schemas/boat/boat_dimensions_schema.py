from api.schemas.defaults import BaseSchema


class BoatDimensionsSchema(BaseSchema):
    ballast_kg: int | None = None
    beam_mm: int
    displacement_kg: int | None = None
    draft_mm: int
    loa_mm: int
    lwl_mm: int
