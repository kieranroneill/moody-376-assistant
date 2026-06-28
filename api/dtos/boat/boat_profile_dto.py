from dataclasses import dataclass
from uuid import UUID

from api.models.boat import BoatProfileModel
from api.schemas.boat import BoatProfileSchema


@dataclass
class BoatProfileDTO:
    id: UUID
    hin: str
    name: str
    year: int
    call_sign: str | None = None
    home_port: str | None = None
    image_uri: str | None = None

    @classmethod
    def from_model(cls, model: BoatProfileModel) -> "BoatProfileDTO":
        return cls(
            id=model.id,
            hin=model.hin,
            name=model.name,
            year=model.year,
            call_sign=model.call_sign,
            home_port=model.home_port,
            image_uri=model.image_uri,
        )

    def to_model(self) -> BoatProfileModel:
        return BoatProfileModel(
            id=self.id,
            hin=self.hin,
            name=self.name,
            year=self.year,
            call_sign=self.call_sign,
            home_port=self.home_port,
            image_uri=self.image_uri,
        )

    @classmethod
    def from_schema(cls, schema: BoatProfileSchema) -> "BoatProfileDTO":
        return cls(
            id=schema.id,
            hin=schema.hin,
            name=schema.name,
            year=schema.year,
            call_sign=schema.call_sign,
            home_port=schema.home_port,
            image_uri=schema.image_uri,
        )

    def to_schema(self) -> BoatProfileSchema:
        return BoatProfileSchema(
            id=self.id,
            hin=self.hin,
            name=self.name,
            year=self.year,
            call_sign=self.call_sign,
            home_port=self.home_port,
            image_uri=self.image_uri,
        )
