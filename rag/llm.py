from ollama import chat

response = chat(
    model="qwen2.5:3b",
    messages=[
        {
            "role": "user",
            "content": "Explain linked lists in two sentences."
        }
    ]
)

print(response.message.content)