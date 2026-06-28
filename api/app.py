import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from api import routers, utilities


def _app() -> FastAPI:
    app_title = os.environ["APP_TITLE"]
    app = FastAPI(lifespan=_lifespan, title=f"{app_title} API")

    app.include_router(routers.boat.router)
    app.include_router(routers.chat.router)

    return app


@asynccontextmanager
async def _lifespan(app: FastAPI) -> AsyncIterator[None]:
    print(utilities.database.url())
    database_engine = create_async_engine(utilities.database.url(), pool_pre_ping=True)

    # attach the initialized agent, database (session factory) and data path so it is available for each route
    # via dependencies
    app.state.database = async_sessionmaker(
        bind=database_engine,
        class_=AsyncSession,
        expire_on_commit=False,
        autoflush=False,
    )
    app.state.agent = utilities.agent.initialize()
    app.state.data_path = Path(__file__).resolve().parent.parent / "data"

    yield
    # cleanup
    await database_engine.dispose()


app = _app()
