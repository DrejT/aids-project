import { Box, Button } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { Review } from "../lib/types";
import useReviewsSummary from "../hooks/useReviewsSummary";
import Summary from "./Summary";
import { useApp } from "../lib/context";

export default function ReviewsList() {
  const { handleSubmit } = useReviewsSummary();
  const { summary, reviews } = useApp();
  console.log(summary);
  return (
    <Box sx={{ minHeight: "80vh" }}>
      {reviews.length > 0 ? (
        <Box>
          {reviews?.map((data: Review, i: number) => {
            return (
              <div key={i}>
                <ReviewCard data={data} />
              </div>
            );
          })}
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                position: "fixed",
                bottom: "1rem",
                left: "0px",
                right: "0px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: "red" }}
              >
                summarize
              </Button>
            </Box>
          </form>
        </Box>
      ) : null}
      {summary ? <Summary /> : null}
    </Box>
  );
}
