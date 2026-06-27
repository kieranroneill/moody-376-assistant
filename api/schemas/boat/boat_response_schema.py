from pydantic import BaseModel

from api import schemas

from .boat_profile_schema import BoatProfileSchema
from .boat_specification_schema import BoatSpecificationSchema


class BoatResponseSchema(schemas.defaults.BaseSchema):
    profile: BoatProfileSchema
    specification: BoatSpecificationSchema
