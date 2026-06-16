from fastapi import APIRouter, Depends

from api import controllers, dependencies, enums, schemas

router = APIRouter(
    prefix=f"{enums.api.RouteEnum.BASE}{enums.api.RouteEnum.BOAT}",
    tags=["boat"],
)


@router.get("", response_model=schemas.boat.BoatResponseSchema)
async def boat(data_path=Depends(dependencies.data_path), database=Depends(dependencies.database)):
    controller = controllers.BoatController()

    return await controller.boat(
        specification_path=data_path / "static" / "boat_specification.json", database=database, profile_id="test"
    )
