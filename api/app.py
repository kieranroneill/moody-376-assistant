import os
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from langchain.agents import create_agent
from langchain_ollama import ChatOllama

from api import routers, tools


def _app() -> FastAPI:
    app = FastAPI(lifespan=_lifespan, title="Boat Assistant API")

    app.include_router(routers.boat.router)
    app.include_router(routers.chat.router)

    return app


@asynccontextmanager
async def _lifespan(app: FastAPI):
    model = ChatOllama(
        base_url=os.getenv("MODEL_BASE_URL", "http://model:11434"),
        model=os.getenv("MODEL", "llama3.1:8b"),
        temperature=0,
    )
    agent = create_agent(
        model=model,
        system_prompt=(
            "You are a helpful assistant. "
            "Use tool results as the source of truth. "
            "Do not invent fields that are not present in the tool output."
        ),
        tools=[tools.get_weather_by_location],
    )

    # attach the initialized agent so it is available for each route
    app.state.agent = agent
    app.state.data_path = Path(__file__).resolve().parent.parent / "data"

    yield
    # cleanup...


app = _app()
