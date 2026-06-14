from pydantic import BaseModel


class BoatTanks(BaseModel):
    fuel_capacity_l: int | None = None
    water_capacity_l: int | None = None
