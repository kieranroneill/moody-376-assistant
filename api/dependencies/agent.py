from fastapi import Request


def agent(request: Request):
    return request.app.state.agent
