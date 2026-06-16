from typing import Any


def text_from_chunk(chunk: Any) -> str:
    """
    Extract text content from a streamed LangChain chunk.

    Args:
        chunk (Any): The streamed LangChain chunk.

    Returns:
        (str): The text content, or an empty string when the chunk does not contain text.
    """
    content = getattr(chunk, "content", None)

    if isinstance(content, str):
        return content

    if isinstance(content, list):
        parts: list[str] = []

        for item in content:
            if isinstance(item, str):
                parts.append(item)

            if isinstance(item, dict) and item.get("type") == "text":
                text = item.get("text")

                if isinstance(text, str):
                    parts.append(text)

        return "".join(parts)

    content_blocks = getattr(chunk, "content_blocks", None)

    if isinstance(content_blocks, list):
        parts: list[str] = []

        for block in content_blocks:
            if isinstance(block, dict) and block.get("type") == "text":
                text = block.get("text")

                if isinstance(text, str):
                    parts.append(text)

        return "".join(parts)

    return ""
