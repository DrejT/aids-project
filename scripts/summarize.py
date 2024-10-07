from transformers import pipeline
import json

file_name = "reviews.json"
summary_file_name= "summary.txt"
d = None

with open(file_name,"r") as f:
    d = json.load(f)

combined_text = " ".join(d["reviews_list"])

summarizer = pipeline("summarization")

def chunk_text(text, max_chunk_size=1000):
    # Split the text into smaller chunks
    return [text[i:i+max_chunk_size] for i in range(0, len(text), max_chunk_size)]

# Assuming `combined_text` is the long text you need to summarize
chunks = chunk_text(combined_text, max_chunk_size=1024)  # Adjust chunk size to be within model limit

# Summarize each chunk and combine the results
chunk_summaries = [summarizer(chunk, max_length=150, min_length=50, do_sample=False)[0]['summary_text'] for chunk in chunks]
final_summary = " ".join(chunk_summaries)

with open(summary_file_name,"w") as f:
    f.write(final_summary)

print("summary stored")
