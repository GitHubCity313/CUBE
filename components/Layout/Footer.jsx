import * as React from "react";
import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <Grid
      xs={12}
      p={4}
      sx={{
        backgroundColor: "pink",
        textAlign: "center",
      }}
    >
      Youpi le footer o/
    </Grid>
  );
}
