import uuid

from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from api.models.defaults.base_model import BaseModel

from .boat_specification_model import BoatSpecificationModel


class BoatProfileModel(BaseModel):
    __tablename__ = "boat_profiles"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    specification_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("boat_specifications.id", ondelete="RESTRICT"),
        nullable=False,
    )

    call_sign: Mapped[str | None] = mapped_column(String, nullable=True)
    home_port: Mapped[str | None] = mapped_column(String, nullable=True)
    hin: Mapped[str] = mapped_column(String, nullable=False)
    image_uri: Mapped[str | None] = mapped_column(String, nullable=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)

    specification: Mapped["BoatSpecificationModel"] = relationship()
