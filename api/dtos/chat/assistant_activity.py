from dataclasses import dataclass

from api import enums


@dataclass(frozen=True)
class AssistantActivity:
    activity: enums.chat.AssistantActivityEnum
    content: str
