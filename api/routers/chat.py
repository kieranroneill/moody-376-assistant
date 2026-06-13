from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse

from api import controllers, dependencies, enums, schemas

router = APIRouter(
    prefix=f"{enums.api.RouteEnum.BASE}{enums.api.RouteEnum.CHAT}",
    tags=["chat"],
)


@router.post("", response_model=schemas.chat.ChatResponse)
async def chat(
    request: schemas.chat.ChatRequest,
    agent=Depends(dependencies.get_agent),
):
    controller = controllers.ChatController()

    try:
        return await controller.chat(
            agent,
            message=request.message,
            session_id=request.session_id,
        )
    # TODO: handle more exceptions
    except Exception as exception:
        raise HTTPException(
            status_code=500,
            detail=schemas.errors.BaseErrorResponse(
                code=enums.api.ErrorCodeEnum.UNKNOWN,
                message=str(exception),
            ),
        )


@router.post(
    enums.api.RouteEnum.STREAM,
    response_class=StreamingResponse,
    responses={
        200: {
            "description": "Stream of chat response events",
            "content": {
                "text/event-stream": {
                    "schema": {
                        "anyOf": [
                            schemas.chat.ChatStreamDoneEvent.model_json_schema(),
                            schemas.chat.ChatStreamErrorEvent.model_json_schema(),
                            schemas.chat.ChatStreamTokenEvent.model_json_schema(),
                        ]
                    }
                }
            },
        }
    },
)
async def chat_stream(
    request: schemas.chat.ChatRequest,
    agent=Depends(dependencies.get_agent),
):
    controller = controllers.ChatController()

    try:
        return controller.chat_stream(
            agent,
            message=request.message,
            session_id=request.session_id,
        )
    # TODO: handle more exceptions
    except Exception as exception:
        raise HTTPException(
            status_code=500,
            detail=schemas.chat.BaseErrorResponse(
                code=enums.api.ErrorCodeEnum.UNKNOWN,
                message=str(exception),
            ),
        )
