import json
import uuid
from pathlib import Path

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from api import models, schemas


class BoatController:
    ###
    # public functions
    ###

    async def boat(
        self,
        specification_path: Path,
        database: AsyncSession,
        profile_id: uuid.UUID,
    ) -> schemas.boat.BoatResponseSchema:
        """
        ...

        Raises:
        """
        #         profile = await database.get(models.BoatProfileModel, profile_id)
        # TODO: fetch from database
        profile = models.BoatProfileModel(
            id="e2d06f1e-78b3-495e-84eb-e6ea1a1b6946",
            hin="12345",
            name="Blaise",
            year=1989,
        )

        if profile is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="boat profile not found",
            )

        try:
            with specification_path.open("r", encoding="utf-8") as file:
                boat_specification = json.load(file)
        except FileNotFoundError as exception:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Boat specification file not found.",
            ) from exception
        except json.JSONDecodeError as exception:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Boat specification file contains invalid JSON.",
            ) from exception

        return schemas.boat.BoatResponseSchema(
            instruments=[],
            logbook=[],
            maintenance=[],
            profile=schemas.boat.BoatProfileSchema(
                call_sign=profile.call_sign,
                home_port=profile.home_port,
                hin=profile.hin,
                id=profile.id,
                image_uri=profile.image_uri,
                name=profile.name,
                year=profile.year,
            ),
            specification=schemas.boat.BoatSpecificationSchema(
                **boat_specification,
            ),
        )
