from enum import StrEnum


class ChatStreamEventTypeEnum(StrEnum):
    ACTIVITY = "activity"
    DONE = "done"
    ERROR = "error"
    TOKEN = "token"
