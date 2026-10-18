import chromadb
from pathlib import Path

# Choose where the database will be saved
db_path = Path(__file__).resolve().parent / "chroma_db"

print("Database location:", db_path.resolve())

# Create or open a persistent database
client = chromadb.PersistentClient(path=str(db_path))

# Create or open a collection
collection = client.get_or_create_collection(
    name="hyperlane_courses"
)

import json

# Load our previously saved embeddings
json_path = Path(__file__).resolve().parent / "data" / "cs310_embeddings.json"

records = json.loads(json_path.read_text(encoding="utf-8-sig"))

# Insert each chunk into ChromaDB
collection.upsert(
    ids=[f"CS310-linked-lists-{r['chunk_id']}" for r in records],
    documents=[r["text"] for r in records],
    embeddings=[r["embedding"] for r in records],
    metadatas=[
    {
        "course_id": r["course_id"],
        "topic_id": r["topic_id"],
        "source_id": r["source_id"],
        "source_title": "Open Data Structures — Singly-Linked Lists",
        "source_url": "https://opendatastructures.org/ods-java/3_1_SLList_Singly_Linked_Li.html"
    }
    for r in records
]
)

print("Collection:",collection.name)
print("Stored chunks:",collection.count())
