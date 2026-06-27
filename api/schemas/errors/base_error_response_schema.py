from pydantic import BaseModel

from api import schemas


class BaseErrorResponseSchema(schemas.defaults.BaseSchema):
    code: int
    message: str
