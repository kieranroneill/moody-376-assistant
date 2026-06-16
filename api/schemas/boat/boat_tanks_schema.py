from pydantic import BaseModel


class BoatTanksSchema(BaseModel):
    fuel_capacity_l: int | None = None
    water_capacity_l: int | None = None
