from uuid import UUID

from fastapi import APIRouter, Depends

from api import controllers, dependencies, enums, schemas

router = APIRouter(
    prefix=f"{enums.api.RouteEnum.BASE}{enums.api.RouteEnum.BOAT}",
    tags=["boat"],
)


@router.get("/{profile_id}", response_model=schemas.boat.BoatResponseSchema)
async def boat(profile_id: UUID, database=Depends(dependencies.database)):
    controller = controllers.BoatController()

    return await controller.boat(database=database, profile_id=profile_id)
