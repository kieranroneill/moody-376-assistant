from fastapi import APIRouter

from api import controllers, enums, schemas

router = APIRouter(
    prefix=f"{enums.api.RouteEnum.BASE}{enums.api.RouteEnum.BOAT}",
    tags=["boat"],
)


@router.get("", response_model=schemas.boat.BoatResponse)
async def boat():
    controller = controllers.BoatController()

    return await controller.boat()
