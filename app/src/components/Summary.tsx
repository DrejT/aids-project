import { Box, Button, SwipeableDrawer, Typography } from "@mui/material";
import { useState } from "react";
import { useApp } from "../lib/context";

export default function Summary() {
  const { summary } = useApp();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  return (
    <SwipeableDrawer
      anchor="bottom"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1">{summary}</Typography>
        <Button onClick={toggleDrawer(false)}>Close</Button>
      </Box>
    </SwipeableDrawer>
  );
}
