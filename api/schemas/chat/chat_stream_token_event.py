from typing import Literal
from uuid import UUID

from pydantic import BaseModel

from api import enums


class ChatStreamTokenEvent(BaseModel):
    content: str
    session_id: UUID
    type: Literal[enums.chat.ChatStreamEventTypeEnum.TOKEN] = enums.chat.ChatStreamEventTypeEnum.TOKEN
