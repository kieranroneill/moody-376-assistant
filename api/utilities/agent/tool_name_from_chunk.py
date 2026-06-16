from typing import Any


def tool_name_from_chunk(chunk: Any, metadata: dict[str, Any] | None = None) -> str | None:
    tool_calls = getattr(chunk, "tool_calls", None)

    if isinstance(tool_calls, list) and tool_calls:
        name = tool_calls[0].get("name")

        if isinstance(name, str):
            return name

    tool_call_chunks = getattr(chunk, "tool_call_chunks", None)

    if isinstance(tool_call_chunks, list) and tool_call_chunks:
        name = tool_call_chunks[0].get("name")

        if isinstance(name, str):
            return name

    additional_kwargs = getattr(chunk, "additional_kwargs", None)

    if isinstance(additional_kwargs, dict):
        raw_tool_calls = additional_kwargs.get("tool_calls")

        if isinstance(raw_tool_calls, list) and raw_tool_calls:
            function = raw_tool_calls[0].get("function")

            if isinstance(function, dict):
                name = function.get("name")

                if isinstance(name, str):
                    return name

    name = getattr(chunk, "name", None)

    if isinstance(name, str):
        return name

    if metadata:
        langgraph_node = metadata.get("langgraph_node")

        if isinstance(langgraph_node, str):
            return langgraph_node

    return None
