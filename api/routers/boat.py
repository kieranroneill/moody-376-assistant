from fastapi import APIRouter

router = APIRouter(
    prefix="/api/boat",
    tags=["boat"],
)


@router.get("")
async def boat():
    return {"details": {"make": "Moody", "model": "376"}}
