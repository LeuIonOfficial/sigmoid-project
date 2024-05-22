import g4f  # type: ignore
from asgiref.sync import sync_to_async
import string

async def ask(messages: list) -> str:
    return await sync_to_async(g4f.ChatCompletion.create)(
        model="gpt-3.5-turbo",
        messages=messages,
        language="en",
    )
