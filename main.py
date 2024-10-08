"""main app module"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from scripts import movie
from scripts import text
import os
import json
import asyncio
import multiprocessing

app = Flask("critic server")


@app.route("/movie/<string:movie_name>", methods=["GET"])
async def get_movie(movie_name):
    """
    return reviews of the given movie name
    """
    movie_name = movie_name.replace(" ", "_")
    reviews_json = movie.get_review_json()
    if reviews_json.get(movie_name, False):
        reviews = reviews_json[movie_name]["reviews"]
        for review in reviews:
            review["sentiment"] = text.get_sentiment(review["quote"])
        return jsonify({"success": True, "reviews": reviews})
    print(movie_name)
    movie_id = movie.get_movie_id(movie_name)
    print(f"Fetched movie_id: {movie_id}")
    if movie_id:
        reviews = movie.get_movie_reviews(movie_id)
        for review in reviews:
            review["sentiment"] = text.get_sentiment(review["quote"])
        quote_reviews_list = await movie.get_quote_reviews_list(reviews)
        await movie.store_reviews(movie_name, reviews, quote_reviews_list)

        return jsonify({"success": True, "reviews": reviews})
    return jsonify({"success": False, "message": "Invalid movie name"})


@app.route("/summarize", methods=["POST"])
def analyze_reviews():
    """
    return summary of the reviews
    """
    try:
        movie_name = request.json.get("movieName", "deadpool and wolverine")
        print(movie_name)
        movie_name = movie_name.replace(" ", "_")
        reviews_json = movie.get_review_json()
        reviews_list = reviews_json[movie_name]["quote_reviews_list"]

        summary = text.get_summary(reviews_list)
        return jsonify({"summary": summary}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    CORS(app)
    app.run(debug=True)
