import re
import unicodedata

import pycountry

from .normalize_country import normalize_country

COMMON_ALIASES = {
    "uk": "GB",
    "u.k.": "GB",
    "great britain": "GB",
    "britain": "GB",
    "england": "GB",
    "scotland": "GB",
    "wales": "GB",
    "northern ireland": "GB",
    "usa": "US",
    "u.s.": "US",
    "u.s.a.": "US",
    "united states": "US",
    "united states of america": "US",
    "america": "US",
    "uae": "AE",
    "u.a.e.": "AE",
    "united arab emirates": "AE",
    "south korea": "KR",
    "north korea": "KP",
    "russia": "RU",
    "vietnam": "VN",
    "laos": "LA",
    "moldova": "MD",
    "syria": "SY",
    "bolivia": "BO",
    "venezuela": "VE",
    "tanzania": "TZ",
    "brunei": "BN",
    "iran": "IR",
    "micronesia": "FM",
    "palestine": "PS",
    "czech republic": "CZ",
    "kosovo": "XK",  # widely used, not official ISO-3166-1 alpha-2
    "el": "GR",      # common unofficial shorthand for Greece
}


def to_alpha2(value: str) -> str | None:
    """
    Convert a country name, alias, or code into an ISO-3166-1 alpha-2 code.

    Args:
        value (str): The country value, e.g. "UK", "United Kingdom", or "GB".

    Returns:
        (str | None): Returns the ISO-3166-1 alpha-2 country code if resolved, otherwise None.
    """
    if not value or not value.strip():
        return None

    raw = value.strip()
    normalized = normalize_country(raw)

    if len(raw) == 2 and raw.isalpha():
        alpha2 = raw.upper()

        if pycountry.countries.get(alpha_2=alpha2):
            return alpha2

    if normalized in COMMON_ALIASES:
        return COMMON_ALIASES[normalized]

    compact = normalized.replace(".", "")

    if compact in COMMON_ALIASES:
        return COMMON_ALIASES[compact]

    if len(compact) == 2 and compact.isalpha():
        alpha2 = compact.upper()

        if pycountry.countries.get(alpha_2=alpha2):
            return alpha2

    country = pycountry.countries.get(name=raw)

    if country:
        return country.alpha_2

    country = pycountry.countries.get(name=raw.upper())

    if country:
        return country.alpha_2

    try:
        matches = pycountry.countries.search_fuzzy(raw)
        if matches:
            return matches[0].alpha_2
    except LookupError:
        pass

    try:
        matches = pycountry.countries.search_fuzzy(normalized)
        if matches:
            return matches[0].alpha_2
    except LookupError:
        pass

    return None
