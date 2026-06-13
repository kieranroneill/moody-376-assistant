from typing import Literal
from uuid import UUID

from pydantic import BaseModel

from api import enums
from api.schemas.errors import BaseErrorResponse


class ChatStreamErrorEvent(BaseModel):
    error: BaseErrorResponse
    session_id: UUID
    type: Literal[enums.chat.ChatStreamEventTypeEnum.ERROR] = enums.chat.ChatStreamEventTypeEnum.ERROR
