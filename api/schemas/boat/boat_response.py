from uuid import UUID

from pydantic import BaseModel, Field

from .boat_specification import BoatSpecification


class BoatResponse(BaseModel):
    specification: BoatSpecification
