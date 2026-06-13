from enum import StrEnum


class ChatStreamEventTypeEnum(StrEnum):
    DONE = "done"
    ERROR = "error"
    TOKEN = "token"
