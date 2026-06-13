from typing import Literal

from api import enums
from api.schemas.errors import BaseErrorResponse

from .base_chat_stream_event import BaseChatStreamEvent


class ChatStreamErrorEvent(BaseChatStreamEvent):
    error: BaseErrorResponse
    type: Literal[enums.chat.ChatStreamEventTypeEnum.ERROR] = enums.chat.ChatStreamEventTypeEnum.ERROR
