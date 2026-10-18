from sentence_transformers import SentenceTransformer

# Load a free embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")

from pathlib import Path

file_path = Path(__file__).resolve().parent / "data" / "cs310_linked_lists.txt"
text = file_path.read_text(encoding="utf-8")

words = text.split()

chunk_size = 200
overlap = 50
step = chunk_size - overlap

chunks = []

for i in range(0, len(words), step):
    chunk = " ".join(words[i:i + chunk_size])
    chunks.append(chunk)

embeddings = model.encode(chunks)

print("Total chunks:", len(chunks))
print("Embedding shape:", embeddings.shape)

import numpy as np

question = "How do you add an element to a linked list?"

# Convert the student's question into a vector
question_embedding = model.encode(question)

# Compare the question with every textbook chunk
scores = embeddings @ question_embedding

# Find the chunk with the highest similarity
top_indices = np.argsort(scores)[-3:][::-1]

for index in top_indices:
    print(f"\nChunk {index + 1}")
    print(f"Similarity score: {scores[index]:.3f}")
    print(chunks[index][:300])


# Store embeddings and course information
import json

records = []

for i, chunk in enumerate(chunks):
    record = {
        "course_id": "CS310",
        "topic_id": "linked-lists",
        "source_id": "open-data-structures",
        "chunk_id": i,
        "text": chunk,
        "embedding": embeddings[i].tolist()
    }

    records.append(record)

output_path = Path(__file__).resolve().parent  / "data" / "cs310_embeddings.json"
    
output_path.write_text(
    json.dumps(records, indent=2),
    encoding="utf-8"
)

print(f"\nSaved {len(records)} chunks with embeddings.")