import { FormEvent } from "react";
import { Review } from "../lib/types";
import { API_URL } from "../lib/constants";
import { useApp } from "../lib/context";

export default function useFetchMovieReviews() {
  const { movieName, setReviews } = useApp();
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!movieName) {
      return;
    }
    try {
      const res = await fetch(API_URL + "/movie/" + movieName, {
        method: "GET",
      });
      if (res.ok) {
        const response = await res.json();
        const reviews: Review[] = response.reviews;
        setReviews(reviews);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { handleSubmit };
}
