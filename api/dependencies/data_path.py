from pathlib import Path

from fastapi import Request


def data_path(request: Request) -> Path:
    return request.app.state.data_path
