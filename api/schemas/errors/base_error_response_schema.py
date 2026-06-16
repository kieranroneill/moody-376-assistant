from pydantic import BaseModel


class BaseErrorResponseSchema(BaseModel):
    code: int
    message: str
