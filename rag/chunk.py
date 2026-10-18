from pathlib import Path

# Find our extracted textbook file
data_dir = Path(__file__).resolve().parent / "data"
file_path = data_dir / "cs310_linked_lists.txt"

# Read the textbook content
text = file_path.read_text(encoding="utf-8")

# Split text into words
words = text.split()
chunk_size = 200

# chunk overlap (prevent missing context in neighboring chunks)
overlap = 50
step = chunk_size - overlap


chunks = []

for i in range(0, len(words), step):
    chunk = " ".join(words[i:i + chunk_size])
    chunks.append(chunk)


print(f"Total words: {len(words)}")
print(f"Total chunks: {len(chunks)}")

print("\nFirst chunk:")
print(chunks[0])



