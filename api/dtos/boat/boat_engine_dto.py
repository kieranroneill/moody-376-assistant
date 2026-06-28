from dataclasses import dataclass

from api.schemas.boat import BoatEngineSchema


@dataclass(slots=True)
class BoatEngineDTO:
    drive: str
    fuel_type: str
    horsepower_hp: int
    make: str
    model: str
    cooling: str | None = None
    gearbox: str | None = None
    propeller: str | None = None

    @classmethod
    def from_schema(cls, schema: BoatEngineSchema) -> "BoatEngineDTO":
        return cls(
            cooling=schema.cooling,
            drive=schema.drive,
            fuel_type=schema.fuel_type,
            gearbox=schema.gearbox,
            horsepower_hp=schema.horsepower_hp,
            make=schema.make,
            model=schema.model,
            propeller=schema.propeller,
        )

    def to_schema(self) -> BoatEngineSchema:
        return BoatEngineSchema(
            cooling=self.cooling,
            drive=self.drive,
            fuel_type=self.fuel_type,
            gearbox=self.gearbox,
            horsepower_hp=self.horsepower_hp,
            make=self.make,
            model=self.model,
            propeller=self.propeller,
        )
