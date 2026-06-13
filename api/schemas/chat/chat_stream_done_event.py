from typing import Literal

from pydantic import Field

from api import enums

from .base_chat_stream_event import BaseChatStreamEvent


class ChatStreamDoneEvent(BaseChatStreamEvent):
    timestamp: str = Field(..., min_length=1)
    type: Literal[enums.chat.ChatStreamEventTypeEnum.DONE] = enums.chat.ChatStreamEventTypeEnum.DONE
