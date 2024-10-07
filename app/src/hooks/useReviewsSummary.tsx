import { FormEvent } from "react";
import { API_URL } from "../lib/constants";
import { useApp } from "../lib/context";

export default function useReviewsSummary() {
  const { movieName, setSummary } = useApp();
  // console.log(movieName);
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      console.log("fetching summary with", movieName);
      const res = await fetch(API_URL + "/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieName }),
      });
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        setSummary(response.summary);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return { handleSubmit };
}
