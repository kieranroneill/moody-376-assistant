from pydantic import BaseModel


class BoatSailAreaSchema(BaseModel):
    fore_cm2: int | None = None
    main_cm2: int | None = None
    reported_cm2: int | None = None
