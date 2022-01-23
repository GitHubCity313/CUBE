import * as React from "react";
import { Grid } from "@mui/material";

export default function Footer() {
  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: "lightgreen",
        textAlign: "center",
      }}
    >
      Youpi le footer o/
    </Grid>
  );
}
