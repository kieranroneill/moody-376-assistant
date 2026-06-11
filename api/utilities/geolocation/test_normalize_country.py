import pytest

from .normalize_country import normalize_country


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("United Kingdom", "united kingdom"),
        ("  United Kingdom  ", "united kingdom"),
        ("UNITED KINGDOM", "united kingdom"),
        ("Côte d’Ivoire", "cote divoire"),
        ("São Tomé and Príncipe", "sao tome and principe"),
        ("Bosnia & Herzegovina", "bosnia and herzegovina"),
        ("Korea (Republic of)", "korea republic of"),
        ("People's Republic of China", "peoples republic of china"),
        ("Timor-Leste", "timor-leste"),
        ("U.S.A.", "u.s.a."),
        ("Country, With: Punctuation!", "country with punctuation"),
        ("Country     With\tWhitespace\n", "country with whitespace"),
    ],
)
def test_normalize_country(value, expected):
    assert normalize_country(value) == expected
