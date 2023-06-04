import { Grid, Typography } from "@mui/material";
import React from "react";

const Main = () => {
  return (
    <>
      <Grid container rowSpacing={4.5} columnSpacing={2.75}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "500", letterSpacing: "1px" }}
          >
            Dashboard
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Main;
