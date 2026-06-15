from typing import Literal
from uuid import UUID

from pydantic import BaseModel, Field

from api import enums


class ChatMessageSchema(BaseModel):
    content: str = Field(..., min_length=1)
    id: UUID
    role: Literal[enums.chat.MessageRoleEnum.ASSISTANT, enums.chat.MessageRoleEnum.USER]
    timestamp: str = Field(..., min_length=1)
