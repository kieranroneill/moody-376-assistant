from pydantic import BaseModel

from .boat_profile_schema import BoatProfileSchema
from .boat_specification_schema import BoatSpecificationSchema


class BoatResponseSchema(BaseModel):
    profile: BoatProfileSchema
    specification: BoatSpecificationSchema
