from typing import Any


def is_tool_result_chunk(chunk: Any) -> bool:
    return getattr(chunk, "type", None) == "tool"
