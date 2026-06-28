from dataclasses import dataclass

from api.schemas.boat import BoatTanksSchema


@dataclass(slots=True)
class BoatTanksDTO:
    fuel_capacity_l: int | None = None
    water_capacity_l: int | None = None

    @classmethod
    def from_schema(cls, schema: BoatTanksSchema) -> "BoatTanksDTO":
        return cls(
            fuel_capacity_l=schema.fuel_capacity_l,
            water_capacity_l=schema.water_capacity_l,
        )

    def to_schema(self) -> BoatTanksSchema:
        return BoatTanksSchema(
            fuel_capacity_l=self.fuel_capacity_l,
            water_capacity_l=self.water_capacity_l,
        )
