from typing import Literal
from uuid import UUID

from pydantic import Field

from api import enums, schemas


class ChatMessageSchema(schemas.defaults.BaseSchema):
    activity: enums.chat.AssistantActivityEnum | None = None
    content: str = Field(..., min_length=1)
    id: UUID
    role: Literal[enums.chat.MessageRoleEnum.ASSISTANT, enums.chat.MessageRoleEnum.USER]
    timestamp: str = Field(..., min_length=1)
