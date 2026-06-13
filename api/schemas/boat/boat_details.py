from pydantic import BaseModel, Field


class BoatDetails(BaseModel):
    make: str = Field(..., min_length=1)
    model: str = Field(..., min_length=1)
