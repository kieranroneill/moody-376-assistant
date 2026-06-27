from api.schemas.defaults import BaseSchema


class BoatSailAreaSchema(BaseSchema):
    fore_cm2: int | None = None
    main_cm2: int | None = None
    reported_cm2: int | None = None
