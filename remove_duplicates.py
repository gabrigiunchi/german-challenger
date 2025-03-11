import json

def remove_duplicates(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        data = json.load(file)
        data = data["words"]
    
    seen = set()
    unique_data = []
    
    for entry in data:
        key = entry["german"]
        if key not in seen:
            seen.add(key)
            unique_data.append(entry)
    
    with open(file_path, "w", encoding="utf-8") as file:
        json.dump({"words": unique_data}, file, indent=2, ensure_ascii=False)

remove_duplicates("src/data/verbs.json")
remove_duplicates("src/data/nouns.json")
