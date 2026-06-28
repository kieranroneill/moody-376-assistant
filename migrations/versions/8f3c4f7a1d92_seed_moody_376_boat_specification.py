"""seed moody 376 boat specification

Revision ID: 8f3c4f7a1d92
Revises: 6dbf5700fc2b
Create Date: 2026-06-28 12:28:00.000000

"""

import uuid
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.sql import column, table

# revision identifiers, used by Alembic.
revision: str = "8f3c4f7a1d92"
down_revision: Union[str, Sequence[str], None] = "6dbf5700fc2b"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


MOODY_376_SPECIFICATION_ID = uuid.UUID("4b11f254-b2a5-4f6d-b442-452a2f6f6d12")


def upgrade() -> None:
    op.bulk_insert(
        table(
            "boat_specifications",
            column("id", sa.UUID()),
            column("builder", sa.String()),
            column("construction", sa.String()),
            column("designer", sa.String()),
            column("first_built", sa.Integer()),
            column("hull_type", sa.String()),
            column("last_built", sa.Integer()),
            column("make", sa.String()),
            column("model", sa.String()),
            column("dimensions_ballast_kg", sa.Integer()),
            column("dimensions_beam_mm", sa.Integer()),
            column("dimensions_displacement_kg", sa.Integer()),
            column("dimensions_draft_mm", sa.Integer()),
            column("dimensions_loa_mm", sa.Integer()),
            column("dimensions_lwl_mm", sa.Integer()),
            column("engine_cooling", sa.String()),
            column("engine_drive", sa.String()),
            column("engine_fuel_type", sa.String()),
            column("engine_gearbox", sa.String()),
            column("engine_horsepower_hp", sa.Integer()),
            column("engine_make", sa.String()),
            column("engine_model", sa.String()),
            column("engine_propeller", sa.String()),
            column("rigging_e_mm", sa.Integer()),
            column("rigging_forestay_length_mm", sa.Integer()),
            column("rigging_i_mm", sa.Integer()),
            column("rigging_j_mm", sa.Integer()),
            column("rigging_p_mm", sa.Integer()),
            column("rigging_type", sa.String()),
            column("sail_area_fore_cm2", sa.Integer()),
            column("sail_area_main_cm2", sa.Integer()),
            column("sail_area_reported_cm2", sa.Integer()),
            column("tanks_fuel_capacity_l", sa.Integer()),
            column("tanks_water_capacity_l", sa.Integer()),
        ),
        [
            {
                "id": MOODY_376_SPECIFICATION_ID,
                "builder": "Marine Projects Ltd.",
                "construction": "GRP",
                "designer": "Bill Dixon",
                "first_built": 1985,
                "hull_type": "Fin with rudder on skeg",
                "last_built": 1991,
                "make": "Moody",
                "model": "376",
                "dimensions_ballast_kg": 2948,
                "dimensions_beam_mm": 3810,
                "dimensions_displacement_kg": 7371,
                "dimensions_draft_mm": 1680,
                "dimensions_loa_mm": 11530,
                "dimensions_lwl_mm": 9500,
                "engine_cooling": "freshwater",
                "engine_drive": "shaft",
                "engine_fuel_type": "diesel",
                "engine_gearbox": "ZF 10 M",
                "engine_horsepower_hp": 35,
                "engine_make": "Thornycroft",
                "engine_model": "T80",
                "engine_propeller": "fixed 3-blade",
                "rigging_e_mm": 4320,
                "rigging_forestay_length_mm": 15040,
                "rigging_i_mm": 14330,
                "rigging_j_mm": 4570,
                "rigging_p_mm": 12600,
                "rigging_type": "Masthead Sloop",
                "sail_area_fore_cm2": 327500,
                "sail_area_main_cm2": 271900,
                "sail_area_reported_cm2": 602000,
                "tanks_fuel_capacity_l": 204,
                "tanks_water_capacity_l": 250,
            }
        ],
    )


def downgrade() -> None:
    op.execute(sa.text("DELETE FROM boat_specifications WHERE id = :id").bindparams(id=MOODY_376_SPECIFICATION_ID))
