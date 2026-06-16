from typing import Literal

from api import enums
from api.schemas.errors import BaseErrorResponseSchema

from .base_chat_stream_event_schema import BaseChatStreamEventSchema


class ChatStreamErrorEventSchema(BaseChatStreamEventSchema):
    error: BaseErrorResponseSchema
    type: Literal[enums.chat.ChatStreamEventTypeEnum.ERROR] = enums.chat.ChatStreamEventTypeEnum.ERROR
