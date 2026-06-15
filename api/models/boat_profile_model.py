import uuid

from sqlalchemy import Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from .base_model import BaseModel


class BoatProfileModel(BaseModel):
    __tablename__ = "boats"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    call_sign: Mapped[str | None] = mapped_column(String, nullable=True)
    home_port: Mapped[str | None] = mapped_column(String, nullable=True)
    hin: Mapped[str] = mapped_column(String, nullable=False)
    image_uri: Mapped[str | None] = mapped_column(String, nullable=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
