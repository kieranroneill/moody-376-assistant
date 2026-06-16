from enum import StrEnum


class AssistantActivityEnum(StrEnum):
    POWER_CHECK = "power_check"
    MANUAL_LOOKUP = "manual_lookup"
    REVIEW_LOG = "review_log"
    SYSTEM_CHECK = "system_check"
    WEATHER_CHECK = "weather_check"
