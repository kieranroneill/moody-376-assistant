from dataclasses import dataclass
from uuid import UUID

from api.models.boat import BoatSpecificationModel
from api.schemas.boat import BoatSpecificationSchema

from .boat_dimensions_dto import BoatDimensionsDTO
from .boat_engine_dto import BoatEngineDTO
from .boat_rigging_dto import BoatRiggingDTO
from .boat_sail_area_dto import BoatSailAreaDTO
from .boat_tanks_dto import BoatTanksDTO


@dataclass(slots=True)
class BoatSpecificationDTO:
    id: UUID
    dimensions: BoatDimensionsDTO
    make: str
    model: str
    builder: str | None = None
    construction: str | None = None
    designer: str | None = None
    engine: BoatEngineDTO | None = None
    first_built: int | None = None
    hull_type: str | None = None
    last_built: int | None = None
    rigging: BoatRiggingDTO | None = None
    sail_area: BoatSailAreaDTO | None = None
    tanks: BoatTanksDTO | None = None

    @classmethod
    def from_model(cls, model: BoatSpecificationModel) -> "BoatSpecificationDTO":
        engine = None
        if all(
            value is not None
            for value in (
                model.engine_drive,
                model.engine_fuel_type,
                model.engine_horsepower_hp,
                model.engine_make,
                model.engine_model,
            )
        ):
            engine = BoatEngineDTO(
                cooling=model.engine_cooling,
                drive=model.engine_drive,
                fuel_type=model.engine_fuel_type,
                gearbox=model.engine_gearbox,
                horsepower_hp=model.engine_horsepower_hp,
                make=model.engine_make,
                model=model.engine_model,
                propeller=model.engine_propeller,
            )

        rigging = None
        if model.rigging_type is not None and model.rigging_forestay_length_mm is not None:
            rigging = BoatRiggingDTO(
                e_mm=model.rigging_e_mm,
                forestay_length_mm=model.rigging_forestay_length_mm,
                i_mm=model.rigging_i_mm,
                j_mm=model.rigging_j_mm,
                p_mm=model.rigging_p_mm,
                type=model.rigging_type,
            )

        sail_area = None
        if any(
            value is not None
            for value in (
                model.sail_area_fore_cm2,
                model.sail_area_main_cm2,
                model.sail_area_reported_cm2,
            )
        ):
            sail_area = BoatSailAreaDTO(
                fore_cm2=model.sail_area_fore_cm2,
                main_cm2=model.sail_area_main_cm2,
                reported_cm2=model.sail_area_reported_cm2,
            )

        tanks = None
        if any(
            value is not None
            for value in (
                model.tanks_fuel_capacity_l,
                model.tanks_water_capacity_l,
            )
        ):
            tanks = BoatTanksDTO(
                fuel_capacity_l=model.tanks_fuel_capacity_l,
                water_capacity_l=model.tanks_water_capacity_l,
            )

        return cls(
            id=model.id,
            builder=model.builder,
            construction=model.construction,
            designer=model.designer,
            dimensions=BoatDimensionsDTO(
                ballast_kg=model.dimensions_ballast_kg,
                beam_mm=model.dimensions_beam_mm,
                displacement_kg=model.dimensions_displacement_kg,
                draft_mm=model.dimensions_draft_mm,
                loa_mm=model.dimensions_loa_mm,
                lwl_mm=model.dimensions_lwl_mm,
            ),
            engine=engine,
            first_built=model.first_built,
            hull_type=model.hull_type,
            last_built=model.last_built,
            make=model.make,
            model=model.model,
            rigging=rigging,
            sail_area=sail_area,
            tanks=tanks,
        )

    def to_model(self) -> BoatSpecificationModel:
        return BoatSpecificationModel(
            id=self.id,
            builder=self.builder,
            construction=self.construction,
            designer=self.designer,
            first_built=self.first_built,
            hull_type=self.hull_type,
            last_built=self.last_built,
            make=self.make,
            model=self.model,
            dimensions_ballast_kg=self.dimensions.ballast_kg,
            dimensions_beam_mm=self.dimensions.beam_mm,
            dimensions_displacement_kg=self.dimensions.displacement_kg,
            dimensions_draft_mm=self.dimensions.draft_mm,
            dimensions_loa_mm=self.dimensions.loa_mm,
            dimensions_lwl_mm=self.dimensions.lwl_mm,
            engine_cooling=self.engine.cooling if self.engine else None,
            engine_drive=self.engine.drive if self.engine else None,
            engine_fuel_type=self.engine.fuel_type if self.engine else None,
            engine_gearbox=self.engine.gearbox if self.engine else None,
            engine_horsepower_hp=self.engine.horsepower_hp if self.engine else None,
            engine_make=self.engine.make if self.engine else None,
            engine_model=self.engine.model if self.engine else None,
            engine_propeller=self.engine.propeller if self.engine else None,
            rigging_e_mm=self.rigging.e_mm if self.rigging else None,
            rigging_forestay_length_mm=self.rigging.forestay_length_mm if self.rigging else None,
            rigging_i_mm=self.rigging.i_mm if self.rigging else None,
            rigging_j_mm=self.rigging.j_mm if self.rigging else None,
            rigging_p_mm=self.rigging.p_mm if self.rigging else None,
            rigging_type=self.rigging.type if self.rigging else None,
            sail_area_fore_cm2=self.sail_area.fore_cm2 if self.sail_area else None,
            sail_area_main_cm2=self.sail_area.main_cm2 if self.sail_area else None,
            sail_area_reported_cm2=self.sail_area.reported_cm2 if self.sail_area else None,
            tanks_fuel_capacity_l=self.tanks.fuel_capacity_l if self.tanks else None,
            tanks_water_capacity_l=self.tanks.water_capacity_l if self.tanks else None,
        )

    @classmethod
    def from_schema(cls, schema: BoatSpecificationSchema) -> "BoatSpecificationDTO":
        return cls(
            id=schema.id,
            builder=schema.builder,
            construction=schema.construction,
            designer=schema.designer,
            dimensions=BoatDimensionsDTO.from_schema(schema.dimensions),
            engine=BoatEngineDTO.from_schema(schema.engine) if schema.engine else None,
            first_built=schema.first_built,
            hull_type=schema.hull_type,
            last_built=schema.last_built,
            make=schema.make,
            model=schema.model,
            rigging=BoatRiggingDTO.from_schema(schema.rigging) if schema.rigging else None,
            sail_area=BoatSailAreaDTO.from_schema(schema.sail_area) if schema.sail_area else None,
            tanks=BoatTanksDTO.from_schema(schema.tanks) if schema.tanks else None,
        )

    def to_schema(self) -> BoatSpecificationSchema:
        return BoatSpecificationSchema(
            id=self.id,
            builder=self.builder,
            construction=self.construction,
            designer=self.designer,
            dimensions=self.dimensions.to_schema(),
            engine=self.engine.to_schema() if self.engine else None,
            first_built=self.first_built,
            hull_type=self.hull_type,
            last_built=self.last_built,
            make=self.make,
            model=self.model,
            rigging=self.rigging.to_schema() if self.rigging else None,
            sail_area=self.sail_area.to_schema() if self.sail_area else None,
            tanks=self.tanks.to_schema() if self.tanks else None,
        )
