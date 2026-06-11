import logging
import os

from langchain.agents import create_agent
from langchain_ollama import ChatOllama

from api import tools


def main() -> None:
    logging.basicConfig(format="%(levelname)s: %(message)s", level=os.getenv("LOG_LEVEL", "INFO").upper())

    model = ChatOllama(
        base_url=os.getenv("MODEL_BASE_URL", "http://model:11434"),
        model=os.getenv("MODEL", "llama3.1:8b"),
        temperature=0,
    )
    agent = create_agent(
        model=model,
        system_prompt=(
            "You are a helpful assistant."
            "Use tool results as the source of truth."
            "Do not invent fields that are not present in the tool output."
        ),
        tools=[tools.get_weather_by_location],
    )

    result = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": "What's the weather in Portsmouth, UK?",
                }
            ]
        }
    )

    print(result["messages"][-1].content)


if __name__ == "__main__":
    main()
