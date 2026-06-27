from pydantic import BaseModel

from api import schemas


class BoatTanksSchema(schemas.defaults.BaseSchema):
    fuel_capacity_l: int | None = None
    water_capacity_l: int | None = None
