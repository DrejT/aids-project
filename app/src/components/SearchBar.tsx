import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useFetchMovieReviews from "../hooks/useFetchMovieReviews";
import { useApp } from "../lib/context";

export default function SearchBar() {
  const { setMovieName } = useApp();
  const { handleSubmit } = useFetchMovieReviews();

  return (
    <Box sx={{ mb: "1rem" }}>
      <form onSubmit={handleSubmit}>
        {/* <div className="md:w-[30rem] mt-[2rem]"> */}
        <TextField
          onChange={(e) => setMovieName(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Tumbbad"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" sx={{ p: "0px" }}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* </div> */}
      </form>
    </Box>
  );
}
