from uuid import UUID

from pydantic import BaseModel, Field

from .boat_details import BoatDetails


class BoatResponse(BaseModel):
    details: BoatDetails
