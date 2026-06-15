from typing import Literal

from pydantic import Field

from api import enums

from .base_chat_stream_event_schema import BaseChatStreamEventSchema


class ChatStreamTokenEventSchema(BaseChatStreamEventSchema):
    content: str = Field(..., min_length=1)
    type: Literal[enums.chat.ChatStreamEventTypeEnum.TOKEN] = enums.chat.ChatStreamEventTypeEnum.TOKEN
