import json
from pathlib import Path

from fastapi import HTTPException, status

from api import schemas


class BoatController:
    ###
    # public functions
    ###

    async def boat(self, specification_path: Path) -> schemas.boat.BoatResponse:
        """
        ...

        Raises:
        """
        try:
            with specification_path.open("r", encoding="utf-8") as file:
                boat_specification = json.load(file)
        except FileNotFoundError as exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Boat specification file not found.",
            ) from exception
        except json.JSONDecodeError as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Boat specification file contains invalid JSON.",
            ) from exception

        return schemas.boat.BoatResponse(specification=boat_specification)
