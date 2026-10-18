import json
from pathlib import Path

# Locate our knowledge source registry
project_root = Path(__file__).resolve().parent.parent
registry_path = project_root / "src" / "data" / "knowledgeSources.json"

# Read the registered educational sources
with open(registry_path, "r", encoding="utf-8") as file:
    knowledge_sources = json.load(file)

# Display the courses and sources we found
for course, data in knowledge_sources.items():
    print(f"Course: {course}")

    for source in data["sources"]:
        print(f"  Source: {source['title']}")
        print(f"  URL: {source['url']}")



import requests
from bs4 import BeautifulSoup

# CS310: Linked Lists (Open Data Structures, Java edition)
url = "https://opendatastructures.org/ods-java/3_1_SLList_Singly_Linked_Li.html"

response = requests.get(url, timeout=15)
response.raise_for_status()

soup = BeautifulSoup(response.text, "html.parser")

images = soup.find_all("img")

print(f"\nImages found: {len(images)}")

for img in images[:10]:
    print("ALT:", img.get("alt"))
    print("SRC:", img.get("src"))

# Remove scripts and styling
for element in soup(["script", "style"]):
    element.decompose()

# Replace mathematical images with their ALT descriptions
for img in soup.find_all("img"):
    alt = img.get("alt", "").strip()

    if alt.startswith("$") and alt.endswith("$"):
        img.replace_with(f" {alt} ")


# Remove webpage navigation links
for nav in soup.select(
    "nav, .navigation, .navbar, a[href='contents.html'], a[href='index.html']"
):
    nav.decompose()
    
text = soup.get_text(separator=" ", strip=True)

print("\nExtracted textbook content:")
print(text[:1000])



# Create a folder for extracted textbook content
output_dir = project_root / "rag" / "data"
output_dir.mkdir(parents=True, exist_ok=True)

# Save the extracted chapter
output_file = output_dir / "cs310_linked_lists.txt"
output_file.write_text(text, encoding="utf-8")

print(f"\nSaved extracted content to: {output_file}")



output_dir = project_root / "rag" / "data"
output_dir.mkdir(parents=True, exist_ok=True)

output_file = output_dir / "cs310_linked_lists.txt"
output_file.write_text(text, encoding="utf-8")

print(f"Saved to: {output_file}")
