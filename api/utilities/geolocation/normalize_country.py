import re
import unicodedata


def normalize_country(value: str) -> str:
    """
    Normalize country input into a simplified lookup form.

    Args:
        value (str): The raw country input.

    Returns:
        (str): Returns the normalized country string for matching.
    """
    value = value.strip().lower()
    value = unicodedata.normalize("NFKD", value)
    value = "".join(ch for ch in value if not unicodedata.combining(ch))
    value = value.replace("&", " and ")
    value = re.sub(r"[()'’]", "", value)
    value = re.sub(r"[^a-z0-9.\s-]", " ", value)
    value = re.sub(r"\s+", " ", value).strip()

    return value
