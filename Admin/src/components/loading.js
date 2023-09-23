import { Box, CircularProgress, Fade } from "@mui/material";
import React from "react";

const Loading = () => {
  return (
    <Box sx={{ display: "flex", my: 2, justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ height: 40 }}>
        <Fade
          in={true}
          style={{
            transitionDelay: "800ms",
          }}
          unmountOnExit
        >
          <CircularProgress />
        </Fade>
      </Box>
    </Box>
  );
};

export default Loading;
