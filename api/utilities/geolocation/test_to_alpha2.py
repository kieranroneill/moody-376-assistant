import pytest

from .to_alpha2 import to_alpha2


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("GB", "GB"),
        ("gb", "GB"),
        ("US", "US"),
        ("us", "US"),
        ("FR", "FR"),
        ("fr", "FR"),
        ("UK", "GB"),
        ("U.K.", "GB"),
        ("Great Britain", "GB"),
        ("Britain", "GB"),
        ("England", "GB"),
        ("Scotland", "GB"),
        ("Wales", "GB"),
        ("Northern Ireland", "GB"),
        ("USA", "US"),
        ("U.S.", "US"),
        ("U.S.A.", "US"),
        ("United States", "US"),
        ("United States of America", "US"),
        ("America", "US"),
        ("UAE", "AE"),
        ("U.A.E.", "AE"),
        ("United Arab Emirates", "AE"),
        ("South Korea", "KR"),
        ("North Korea", "KP"),
        ("Russia", "RU"),
        ("Vietnam", "VN"),
        ("Laos", "LA"),
        ("Moldova", "MD"),
        ("Syria", "SY"),
        ("Bolivia", "BO"),
        ("Venezuela", "VE"),
        ("Tanzania", "TZ"),
        ("Brunei", "BN"),
        ("Iran", "IR"),
        ("Micronesia", "FM"),
        ("Palestine", "PS"),
        ("Czech Republic", "CZ"),
        ("Kosovo", "XK"),
        ("EL", "GR"),
    ],
)
def test_to_alpha2_resolves_supported_codes_names_and_aliases(value, expected):
    assert to_alpha2(value) == expected


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("France", "FR"),
        ("Germany", "DE"),
        ("Spain", "ES"),
        ("Italy", "IT"),
        ("Ireland", "IE"),
        ("Portugal", "PT"),
        ("Netherlands", "NL"),
        ("Australia", "AU"),
        ("New Zealand", "NZ"),
        ("Japan", "JP"),
        ("Brazil", "BR"),
        ("Canada", "CA"),
    ],
)
def test_to_alpha2_resolves_pycountry_country_names(value, expected):
    assert to_alpha2(value) == expected


@pytest.mark.parametrize(
    ("value", "expected"),
    [
        ("  France  ", "FR"),
        ("  gb  ", "GB"),
        ("  United States  ", "US"),
        ("Côte d’Ivoire", "CI"),
    ],
)
def test_to_alpha2_normalizes_input_before_lookup(value, expected):
    assert to_alpha2(value) == expected


@pytest.mark.parametrize("value", ["", " ", "\t", "\n"])
def test_to_alpha2_returns_none_for_blank_values(value):
    assert to_alpha2(value) is None


@pytest.mark.parametrize(
    "value",
    [
        "not a country",
        "Atlantis",
        "ZZ",
        "123",
        "????",
    ],
)
def test_to_alpha2_returns_none_for_unknown_values(value):
    assert to_alpha2(value) is None
