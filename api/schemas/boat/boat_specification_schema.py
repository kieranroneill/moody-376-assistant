from uuid import UUID

from pydantic import Field

from api.schemas.defaults import BaseSchema

from .boat_dimensions_schema import BoatDimensionsSchema
from .boat_engine_schema import BoatEngineSchema
from .boat_rigging_schema import BoatRiggingSchema
from .boat_sail_area_schema import BoatSailAreaSchema
from .boat_tanks_schema import BoatTanksSchema


class BoatSpecificationSchema(BaseSchema):
    builder: str | None = None
    construction: str | None = None
    designer: str | None = None
    dimensions: BoatDimensionsSchema
    engine: BoatEngineSchema | None = None
    first_built: int | None = None
    hull_type: str | None = None
    id: UUID
    last_built: int | None = None
    make: str = Field(..., min_length=1)
    model: str = Field(..., min_length=1)
    rigging: BoatRiggingSchema | None = None
    sail_area: BoatSailAreaSchema | None = None
    tanks: BoatTanksSchema | None = None
