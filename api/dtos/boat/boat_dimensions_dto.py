from dataclasses import dataclass

from api.schemas.boat import BoatDimensionsSchema


@dataclass(slots=True)
class BoatDimensionsDTO:
    beam_mm: int
    draft_mm: int
    loa_mm: int
    lwl_mm: int
    ballast_kg: int | None = None
    displacement_kg: int | None = None

    @classmethod
    def from_schema(cls, schema: BoatDimensionsSchema) -> "BoatDimensionsDTO":
        return cls(
            ballast_kg=schema.ballast_kg,
            beam_mm=schema.beam_mm,
            displacement_kg=schema.displacement_kg,
            draft_mm=schema.draft_mm,
            loa_mm=schema.loa_mm,
            lwl_mm=schema.lwl_mm,
        )

    def to_schema(self) -> BoatDimensionsSchema:
        return BoatDimensionsSchema(
            ballast_kg=self.ballast_kg,
            beam_mm=self.beam_mm,
            displacement_kg=self.displacement_kg,
            draft_mm=self.draft_mm,
            loa_mm=self.loa_mm,
            lwl_mm=self.lwl_mm,
        )
