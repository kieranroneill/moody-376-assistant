from fastapi import APIRouter

from api import enums, schemas

router = APIRouter(
    prefix=f"{enums.api.RouteEnum.BASE}{enums.api.RouteEnum.BOAT}",
    tags=["boat"],
)


@router.get("", response_model=schemas.boat.BoatResponse)
async def boat():
    return schemas.boat.BoatResponse(details=schemas.boat.BoatDetails(make="Moody", model="376"))
