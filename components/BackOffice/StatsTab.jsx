import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Stack } from "@mui/material";

const StatsTab = (props) => {
  const { chartData } = props;
  return (
    <Grid container>
      <Grid item xs={11}></Grid>
      <Grid item xs={1}>
        <Stack justifyContent="flex-end">
          <Button variant="bleuBtn">Exporter</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default StatsTab;
