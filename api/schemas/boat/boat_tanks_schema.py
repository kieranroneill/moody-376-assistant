from api.schemas.defaults import BaseSchema


class BoatTanksSchema(BaseSchema):
    fuel_capacity_l: int | None = None
    water_capacity_l: int | None = None
