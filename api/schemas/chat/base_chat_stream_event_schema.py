from uuid import UUID

from pydantic import BaseModel

from api import schemas


class BaseChatStreamEventSchema(schemas.defaults.BaseSchema):
    message_id: UUID
    session_id: UUID
