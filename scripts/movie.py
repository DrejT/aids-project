"""
functions communicating with the rottentomatoes api
"""

import json
import os
from bs4 import BeautifulSoup
import requests


def get_movie_id(movie_name):
    """
    parse the movie id from the movie's rottentomatoes page
    inorder to communicate with the rottentomatoes api
    """
    r = requests.get("https://www.rottentomatoes.com/m/" + movie_name, timeout=20)
    soup = BeautifulSoup(r.text, "html.parser")
    watchlist_button = soup.find("watchlist-button")

    # Extract the emsid attribute
    emsid = watchlist_button.get("emsid")
    return emsid


def get_movie_reviews(movie_id):
    """
    use the previously fetched movie id to fetch all the movie reviews
    check for dupe review arrays
    """
    json_data = []
    i = 0
    while i < 26:
        r = requests.get(
            f"https://www.rottentomatoes.com/napi/movie/{movie_id}/reviews/top_critics?after=M{chr(65+i)}%3D%3D&pageCount=40"
        )
        # print(r.json())
        reviews_list = r.json()["reviews"]
        if reviews_list:
            if not json_data:
                json_data.append(reviews_list)
            elif reviews_list[0]["criticName"] != json_data[-1][0]["criticName"]:
                json_data.append(reviews_list)
        print(json_data)
        i += 1
    return [review for list_of_review in json_data for review in list_of_review]


async def get_quote_reviews_list(reviews):
    return [review["quote"] for review in reviews]


async def store_reviews(movie_name, reviews, quote_reviews_list):
    all_reviews = get_review_json()
    data = {"reviews": reviews, "quote_reviews_list": quote_reviews_list}
    all_reviews[movie_name] = data

    with open("data/reviews.json", "w") as file:
        json.dump(all_reviews, file, indent=4)


def get_review_json():
    if os.path.exists("data/reviews.json"):
        with open("data/reviews.json", "r") as file:
            all_reviews = json.load(file)
            return all_reviews
        return {}
