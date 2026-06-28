import uuid

from sqlalchemy import Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from api.models.defaults.base_model import BaseModel


class BoatSpecificationModel(BaseModel):
    __tablename__ = "boat_specifications"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    builder: Mapped[str | None] = mapped_column(String, nullable=True)
    construction: Mapped[str | None] = mapped_column(String, nullable=True)
    designer: Mapped[str | None] = mapped_column(String, nullable=True)
    first_built: Mapped[int | None] = mapped_column(Integer, nullable=True)
    hull_type: Mapped[str | None] = mapped_column(String, nullable=True)
    last_built: Mapped[int | None] = mapped_column(Integer, nullable=True)
    make: Mapped[str] = mapped_column(String, nullable=False)
    model: Mapped[str] = mapped_column(String, nullable=False)

    dimensions_ballast_kg: Mapped[int | None] = mapped_column(Integer, nullable=True)
    dimensions_beam_mm: Mapped[int] = mapped_column(Integer, nullable=False)
    dimensions_displacement_kg: Mapped[int | None] = mapped_column(Integer, nullable=True)
    dimensions_draft_mm: Mapped[int] = mapped_column(Integer, nullable=False)
    dimensions_loa_mm: Mapped[int] = mapped_column(Integer, nullable=False)
    dimensions_lwl_mm: Mapped[int] = mapped_column(Integer, nullable=False)

    engine_cooling: Mapped[str | None] = mapped_column(String, nullable=True)
    engine_drive: Mapped[str | None] = mapped_column(String, nullable=True)
    engine_fuel_type: Mapped[str | None] = mapped_column(String, nullable=True)
    engine_gearbox: Mapped[str | None] = mapped_column(String, nullable=True)
    engine_horsepower_hp: Mapped[int | None] = mapped_column(Integer, nullable=True)
    engine_make: Mapped[str | None] = mapped_column(String, nullable=True)
    engine_model: Mapped[str | None] = mapped_column(String, nullable=True)
    engine_propeller: Mapped[str | None] = mapped_column(String, nullable=True)

    rigging_e_mm: Mapped[int | None] = mapped_column(Integer, nullable=True)
    rigging_forestay_length_mm: Mapped[int | None] = mapped_column(Integer, nullable=True)
    rigging_i_mm: Mapped[int | None] = mapped_column(Integer, nullable=True)
    rigging_j_mm: Mapped[int | None] = mapped_column(Integer, nullable=True)
    rigging_p_mm: Mapped[int | None] = mapped_column(Integer, nullable=True)
    rigging_type: Mapped[str | None] = mapped_column(String, nullable=True)

    sail_area_fore_cm2: Mapped[int | None] = mapped_column(Integer, nullable=True)
    sail_area_main_cm2: Mapped[int | None] = mapped_column(Integer, nullable=True)
    sail_area_reported_cm2: Mapped[int | None] = mapped_column(Integer, nullable=True)

    tanks_fuel_capacity_l: Mapped[int | None] = mapped_column(Integer, nullable=True)
    tanks_water_capacity_l: Mapped[int | None] = mapped_column(Integer, nullable=True)
