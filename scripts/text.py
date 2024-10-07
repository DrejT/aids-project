"""functions performing NLP"""

from transformers import pipeline
from textblob import TextBlob

summarizer = pipeline("summarization")


def get_sentiment(review_text):
    """
    Calculate sentiment polarity for a review.
    Returns a score between -1 (negative) and 1 (positive).
    """
    analysis = TextBlob(review_text)
    return analysis.sentiment.polarity


def get_summary(reviews):
    """
    combine all reviews and return summary
    """
    combined_reviews = " ".join(reviews)
    if len(combined_reviews) > 1000:
        combined_reviews = combined_reviews[:1000]
    summary = summarizer(
        combined_reviews, max_length=100, min_length=30, do_sample=False
    )
    # print("got summary", summary)
    return summary[0]["summary_text"]


# def get_summary(reviews):
#     """
#     Combine all reviews and return a summary.
#     """
#     combined_reviews = " ".join(reviews)
#     if len(combined_reviews) > 1000:
#         combined_reviews = combined_reviews[:1000]

#     # Assuming 'summarizer' is a pre-loaded model (like HuggingFace's summarization pipeline)
#     summary = summarizer(
#         combined_reviews, max_length=100, min_length=30, do_sample=False
#     )

#     # Extract the summary text (if the summarizer returns it as a list of dictionaries)
#     # if isinstance(summary, list) and "summary_text" in summary[0]:
#     #     return summary[0]["summary_text"]

#     return summary


def summarize_reviews(reviews_list, result_dict):
    """
    Function to be run in a separate process for summarizing the reviews.
    The result is saved in a shared dictionary (result_dict).
    """
    try:
        # Call the get_summary function
        summary = get_summary(reviews_list)
        result_dict["summary"] = summary  # Store the summary in the result dictionary
    except Exception as e:
        result_dict["error"] = str(e)
