import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import ReviewCard from "./ReviewCard";
import { Review } from "../lib/types";
import useReviewsSummary from "../hooks/useReviewsSummary";
import Summary from "./Summary";
import { useApp } from "../lib/context";
import { SyntheticEvent, useState } from "react";

export default function ReviewsList() {
  const { handleSubmit } = useReviewsSummary();
  const { summary, reviews } = useApp();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
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
                onClick={handleClick}
              >
                summarize
              </Button>
            </Box>
          </form>
        </Box>
      ) : null}
      {summary ? (
        <Snackbar
          open={open}
          sx={{ width: "300px" }}
          // autoHideDuration={3000} // Duration the Snackbar will stay visible (in milliseconds)
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            <Typography variant="h5">Summary</Typography>
            {summary}
          </Alert>
        </Snackbar>
      ) : null}
    </Box>
  );
}
