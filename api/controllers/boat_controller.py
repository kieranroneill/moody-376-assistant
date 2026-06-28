import uuid

from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from api.dtos.boat import BoatProfileDTO, BoatSpecificationDTO
from api.models.boat import BoatProfileModel
from api.schemas.boat import BoatResponseSchema


class BoatController:
    ###
    # public functions
    ###

    async def boat(
        self,
        database: AsyncSession,
        profile_id: uuid.UUID,
    ) -> BoatResponseSchema:
        """
        ...

        Raises:
        """
        profile_model = await database.get(
            BoatProfileModel,
            profile_id,
            options=[joinedload(BoatProfileModel.specification)],
        )

        if profile_model is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="boat profile not found",
            )

        if profile_model.specification is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="boat specification not found",
            )

        return BoatResponseSchema(
            instruments=[],
            logbook=[],
            maintenance=[],
            profile=BoatProfileDTO.from_model(profile_model).to_schema(),
            specification=BoatSpecificationDTO.from_model(profile_model.specification).to_schema(),
        )
