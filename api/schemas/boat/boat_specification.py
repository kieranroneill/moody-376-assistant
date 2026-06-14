from pydantic import BaseModel, Field

from .boat_dimensions import BoatDimensions
from .boat_engine import BoatEngine
from .boat_rigging import BoatRigging
from .boat_sail_area import BoatSailArea
from .boat_tanks import BoatTanks


class BoatSpecification(BaseModel):
    builder: str | None = None
    construction: str | None = None
    designer: str | None = None
    dimensions: BoatDimensions
    engine: BoatEngine | None = None
    first_built: int | None = None
    hull_type: str | None = None
    last_built: int | None = None
    make: str = Field(..., min_length=1)
    model: str = Field(..., min_length=1)
    rigging: BoatRigging | None = None
    sail_area: BoatSailArea | None = None
    tanks: BoatTanks | None = None
