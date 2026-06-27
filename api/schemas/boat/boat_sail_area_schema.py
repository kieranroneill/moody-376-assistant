from pydantic import BaseModel

from api import schemas


class BoatSailAreaSchema(schemas.defaults.BaseSchema):
    fore_cm2: int | None = None
    main_cm2: int | None = None
    reported_cm2: int | None = None
