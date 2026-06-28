from dataclasses import dataclass

from api.schemas.boat import BoatSailAreaSchema


@dataclass(slots=True)
class BoatSailAreaDTO:
    fore_cm2: int | None = None
    main_cm2: int | None = None
    reported_cm2: int | None = None

    @classmethod
    def from_schema(cls, schema: BoatSailAreaSchema) -> "BoatSailAreaDTO":
        return cls(
            fore_cm2=schema.fore_cm2,
            main_cm2=schema.main_cm2,
            reported_cm2=schema.reported_cm2,
        )

    def to_schema(self) -> BoatSailAreaSchema:
        return BoatSailAreaSchema(
            fore_cm2=self.fore_cm2,
            main_cm2=self.main_cm2,
            reported_cm2=self.reported_cm2,
        )
