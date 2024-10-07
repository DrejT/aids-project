import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box } from "@mui/material";
import SearchBar from "./components/SearchBar";
import ReviewsList from "./components/ReviewsList";
function App() {
  return (
    <Box
      sx={{
        minHeight: "98vh",
        mt: "1rem",
        mx: "0.5rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "600px",
        }}
      >
        <SearchBar />
        <ReviewsList />
      </Box>
    </Box>
  );
}

export default App;
