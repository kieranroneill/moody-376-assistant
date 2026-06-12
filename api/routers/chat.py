import uuid

from fastapi import APIRouter, Depends

from api import dependencies, schemas

router = APIRouter(
    prefix="/api/chat",
    tags=["chat"],
)


@router.post("", response_model=schemas.chat.Response)
async def chat(
    request: schemas.chat.Request,
    agent=Depends(dependencies.get_agent),
):
    session_id = uuid.uuid4()
    result = await agent.ainvoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": request.message,
                }
            ]
        }
    )
    last = result["messages"][-1]

    return schemas.chat.Response(
        messages=[
            schemas.chat.Message(
                role="assistant",
                content=last.content if isinstance(last.content, str) else str(last.content),
            )
        ],
        session_id=session_id,
    )
