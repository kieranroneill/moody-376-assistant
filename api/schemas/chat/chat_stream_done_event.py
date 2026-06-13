from typing import Literal
from uuid import UUID

from pydantic import BaseModel

from api import enums


class ChatStreamDoneEvent(BaseModel):
    session_id: UUID
    type: Literal[enums.chat.ChatStreamEventTypeEnum.DONE] = enums.chat.ChatStreamEventTypeEnum.DONE
