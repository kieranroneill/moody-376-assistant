from api import dtos, enums


def activity_from_tool_name(tool_name: str) -> dtos.chat.AssistantActivity | None:
    if tool_name in ["get_weather_by_location"]:
        return dtos.chat.AssistantActivity(
            activity=enums.chat.AssistantActivityEnum.WEATHER_CHECK, content="Checking weather..."
        )

    return None
