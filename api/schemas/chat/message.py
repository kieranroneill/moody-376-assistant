from typing import Literal

from pydantic import BaseModel, Field


class Message(BaseModel):
    content: str = Field(..., min_length=1)
    role: Literal["user", "assistant"]
