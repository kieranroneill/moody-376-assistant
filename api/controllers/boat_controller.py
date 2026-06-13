from api import schemas


class BoatController:
    ###
    # public functions
    ###

    async def boat(self) -> schemas.boat.BoatResponse:
        """
        ...

        Raises:
        """
        return schemas.boat.BoatResponse(details=schemas.boat.BoatDetails(make="Moody", model="376"))
