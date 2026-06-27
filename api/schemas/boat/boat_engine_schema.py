from pydantic import BaseModel, Field

from api import schemas


class BoatEngineSchema(schemas.defaults.BaseSchema):
    cooling: str | None = None
    drive: str
    fuel_type: str = Field(..., min_length=1)
    gearbox: str | None = None
    horsepower_hp: int
    make: str = Field(..., min_length=1)
    model: str = Field(..., min_length=1)
    propeller: str | None = None
