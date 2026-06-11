import json
import logging

import requests

from api import utilities


def get_weather_by_location(city: str, country_code: str | None = None) -> dict:
    """
    Get current weather for a given city.

    Args:
        city (str): The city.
        country_code (str | None): The country code e.g. "GB".

    Returns:
        (dict): Returns the current weather for the given location.
    """
    logging.debug(f"city: {city}")
    logging.debug(f"country_code: {country_code}")

    _country_code = utilities.geolocation.to_alpha2(country_code) if country_code else None
    params = {
        "name": city,
        "count": 1,
        "language": "en",
        "format": "json",
    }

    if _country_code:
        logging.debug(f"resolved country_code: {_country_code}")

        params["countryCode"] = _country_code

    try:
        response = requests.get(
            "https://geocoding-api.open-meteo.com/v1/search",
            params=params,
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        logging.debug("geocoding response:\n%s", json.dumps(data, indent=2))

        results = data.get("results", [])

        if not results:
            logging.error("could not find location: %s", city)

            return {"error": f"Could not find location: {city}"}

        location = results[0]
        latitude = location["latitude"]
        longitude = location["longitude"]

        logging.debug(
            "found location %s, %s at latitude=%s longitude=%s",
            location["name"],
            location.get("country"),
            latitude,
            longitude,
        )

        response = requests.get(
            "https://api.open-meteo.com/v1/forecast",
            params={
                "current": "temperature_2m,relative_humidity_2m,weather_code",
                "latitude": latitude,
                "longitude": longitude,
            },
            timeout=(5, 20),
        )

        response.raise_for_status()

        data = response.json()
        result = {
            "city": location["name"],
            "country": location.get("country"),
            "current": data.get("current", {}),
            "latitude": latitude,
            "longitude": longitude,
        }

        logging.debug("weather result:\n%s", json.dumps(result, indent=2))

        return result
    except requests.exceptions.Timeout:
        logging.exception("weather request timed out")

        return {"error": "Weather service request timed out"}
    except requests.exceptions.RequestException:
        logging.exception("weather request failed")

        return {"error": "Weather service request failed"}
