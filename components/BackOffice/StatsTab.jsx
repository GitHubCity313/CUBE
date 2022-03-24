import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid, Button, Stack } from "@mui/material";
import PieChart from "./PieChart";

const StatsTab = (props) => {
  const { chartData } = props;
  console.log(chartData);
  return (
    <Grid container>
      <Grid item xs={11}>
        <PieChart
          chartData={chartData?.yearlyPublicationsByCategories}
          title="Création de ressources par catégories"
        />
      </Grid>
      <Grid item xs={1}>
        <Stack justifyContent="flex-end">
          <Button variant="bleuBtn">Exporter</Button>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default StatsTab;
