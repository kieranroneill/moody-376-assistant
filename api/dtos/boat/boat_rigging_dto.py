from dataclasses import dataclass

from api.schemas.boat import BoatRiggingSchema


@dataclass(slots=True)
class BoatRiggingDTO:
    forestay_length_mm: int
    type: str
    e_mm: int | None = None
    i_mm: int | None = None
    j_mm: int | None = None
    p_mm: int | None = None

    @classmethod
    def from_schema(cls, schema: BoatRiggingSchema) -> "BoatRiggingDTO":
        return cls(
            e_mm=schema.e_mm,
            forestay_length_mm=schema.forestay_length_mm,
            i_mm=schema.i_mm,
            j_mm=schema.j_mm,
            p_mm=schema.p_mm,
            type=schema.type,
        )

    def to_schema(self) -> BoatRiggingSchema:
        return BoatRiggingSchema(
            e_mm=self.e_mm,
            forestay_length_mm=self.forestay_length_mm,
            i_mm=self.i_mm,
            j_mm=self.j_mm,
            p_mm=self.p_mm,
            type=self.type,
        )
