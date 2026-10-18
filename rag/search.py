import chromadb
from pathlib import Path
from sentence_transformers import SentenceTransformer

# Connect to our existing database
db_path = Path(__file__).resolve().parent / "chroma_db"
print("Database location:", db_path.resolve())
client = chromadb.PersistentClient(path=str(db_path))

collection = client.get_collection(name="hyperlane_courses")

# Load the same embedding model used for our textbook
model = SentenceTransformer("all-MiniLM-L6-v2")

# Student's question
question = "How do you add an element to a linked list"

# Convert the question into an embedding 
question_embedding = model.encode(question).tolist()

# Search ChromaDB
results = collection.query(
    query_embeddings=[question_embedding],
    n_results=3,
    where={"course_id": "CS310"}
)

# Display retrieved chunks
for i, document in enumerate(results["documents"][0]):
    print(f"\nResult {i+1}")
    print(document[:300])
