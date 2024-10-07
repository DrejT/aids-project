import { Box, Link, Typography } from "@mui/material";
import { Review } from "../lib/types";

export default function ReviewCard({ data }: { data: Review }) {
  return (
    <Box
      sx={{
        px: "0.5rem",
        py: "1rem",
        border: "solid",
        borderWidth: "0.2rem",
        my: "0.5rem",
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          mb: "0.2rem",
          display: "flex",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Typography variant="h6">{data.criticName}</Typography>
        <Typography variant="body1">{data.creationDate}</Typography>
        <Typography variant="body1">
          {data.sentiment?.toPrecision(2) || null}
        </Typography>
      </Box>
      <Box>{data.quote}</Box>
      <Box sx={{ display: "flex", mt: "0.5rem", rowGap: "1rem" }}>
        <Link href={data.reviewUrl} underline="none">
          full review
        </Link>
      </Box>
    </Box>
  );
}
