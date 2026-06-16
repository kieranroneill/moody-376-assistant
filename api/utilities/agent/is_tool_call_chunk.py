from typing import Any


def is_tool_call_chunk(chunk: Any) -> bool:
    tool_calls = getattr(chunk, "tool_calls", None)

    if isinstance(tool_calls, list) and len(tool_calls) > 0:
        return True

    tool_call_chunks = getattr(chunk, "tool_call_chunks", None)

    if isinstance(tool_call_chunks, list) and len(tool_call_chunks) > 0:
        return True

    additional_kwargs = getattr(chunk, "additional_kwargs", None)

    if isinstance(additional_kwargs, dict):
        raw_tool_calls = additional_kwargs.get("tool_calls")

        if isinstance(raw_tool_calls, list) and len(raw_tool_calls) > 0:
            return True

    return False
