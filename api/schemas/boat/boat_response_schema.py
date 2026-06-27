from pydantic import Field

from api.schemas.defaults import BaseSchema

from .boat_profile_schema import BoatProfileSchema
from .boat_specification_schema import BoatSpecificationSchema
from .instrument_reading_schema import InstrumentReadingSchema
from .logbook_entry_schema import LogbookEntrySchema
from .maintenance_item_schema import MaintenanceItemSchema


class BoatResponseSchema(BaseSchema):
    instruments: list[InstrumentReadingSchema] = Field(default_factory=list)
    logbook: list[LogbookEntrySchema] = Field(default_factory=list)
    maintenance: list[MaintenanceItemSchema] = Field(default_factory=list)
    profile: BoatProfileSchema
    specification: BoatSpecificationSchema
