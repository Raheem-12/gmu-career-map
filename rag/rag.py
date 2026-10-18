import chromadb
from pathlib import Path
from sentence_transformers import SentenceTransformer
from ollama import chat

# 1. Students asks a question
question = input("Ask Quasar a question: ")
course_id = input("Enter course ID (e.g., CS310): ").strip().upper()

career = input(
    "Career field (Software Engineering / Cloud & DevOps / Cybersecurity / None): "
).strip()

valid_careers = {
    "software engineering": "Software Engineering",
    "cloud & devops": "Cloud & DevOps",
    "cybersecurity": "Cybersecurity"
}

career = valid_careers.get(career.lower(), None)

# 2. Convert question into an embedding
model = SentenceTransformer("all-MiniLM-L6-v2")
question_embedding = model.encode(question).tolist()

# 3. Search ChromaDB for relevant textbook passages
db_path = Path(__file__).resolve().parent / "chroma_db"
client = chromadb.PersistentClient(path=str(db_path))
collection = client.get_collection(name="hyperlane_courses")

results = collection.query(
    query_embeddings=[question_embedding],
    n_results=3,
    where={"course_id": course_id}
)

# Check whether the retrieved material is relevant
best_distance = results["distances"][0][0] if results["distances"][0] else None

use_textbook = (
    best_distance is not None
    and best_distance < 1.4
)

if use_textbook:
    print("\nMODE: Textbook-grounded")
else:
    print("\nMODE: General AI knowledge")

print("\nRETRIEVAL DISTANCES:")

for i, distance in enumerate(results["distances"][0]):
    print(f"Chunk {i + 1}: {distance:.4f}")

# 4. Combine retrieved passages into context
chunks = results["documents"][0]
context = "\n\n".join(chunks)

# Get the source information for retrieved chunks
metadata = results["metadatas"][0]

# Retrieve source information from ChromaDB
# Display sources only when textbook mode is selected
if use_textbook:
    print("\nRETRIEVED SOURCES:")

    seen_urls = set()

    for source in metadata:
        url = source["source_url"]

        if url not in seen_urls:
            print("Title:", source["source_title"])
            print("URL:", url)
            seen_urls.add(url)

    # Display retrieved passages for debugging
    for i, chunk in enumerate(chunks):
        print(f"\nSOURCE {i + 1}:")
        print(chunk[:400])

# 5. Ask the LLM to explain using the retrieved material
#    Generate an answer based on the selected mode

if use_textbook:
    system_prompt = (
        "You are Quasar, Hyperlane's AI study assistant. "
        "Your goal is to help students deeply understand concepts. "
        "Use the provided textbook context as your primary reference. "
        "You may supplement it with general knowledge to make explanations "
        "clearer, more complete, and easier to understand. "
        "Explain concepts step by step in beginner-friendly language. "
        "Include real-world analogies, practical examples, and code when useful. "
        "Explain why concepts matter, not just how they work. "
        "Clearly distinguish additional factual information not supported "
        "by the provided textbook context. "
        "Never claim the textbook supports information it does not contain. "
    )


    user_prompt = f"Textbook context:\n{context}\n\nQuestion: {question}"

else:
    system_prompt = (
        "You are Quasar, Hyperlane's AI study assistant. "
        "Explain concepts simply with examples using your general knowledge."
    )

    user_prompt = question


response = chat(
    model="qwen2.5:3b",
    messages=[
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]
)

print("\nQUASAR ANSWER:\n")

if not use_textbook:
    print("Note: This answer uses general AI knowledge, not verified course material.\n")

print(response.message.content)

if career:
    career_response = chat(
        model="qwen2.5:3b",
        messages=[
            {
                "role": "system",
                "content": (
    "You are a realistic CS-to-career advisor. "
    "Explain how a CS concept relates to the student's selected career. "
    "Your priority is accuracy, NOT making every concept sound useful. "
    "Classify relevance as Direct, Foundational, or Limited. "
    "Direct means regularly used in actual job responsibilities. "
    "Foundational means useful background knowledge but rarely applied directly. "
    "Limited means little practical relevance to typical job responsibilities. "
    "Never claim a concept is crucial, essential, or widely used "
    "unless that is genuinely true for the selected career. "
    "Do not invent applications or force connections to cloud scalability. "
    "For linked lists in Cloud & DevOps, relevance is Foundational, "
    "not Direct. Cloud engineers rarely implement linked lists themselves. "
    "Respond in exactly 2 sentences: first state the relevance level, "
    "then explain the realistic connection or lack of one."
)
            },
            {
                "role": "user",
                "content": (
                    f"Concept: {question}\n"
                    f"Selected career: {career}\n"
                    "Explain how this concept relates specifically "
                    "to the selected career. "
                    "Do not discuss other careers."
                )
            }
        ]
    )

    print(f"\nCAREER CONNECTION — {career}\n")
    print(career_response.message.content)
