from pydantic import BaseModel


class BaseErrorResponse(BaseModel):
    code: int
    message: str
