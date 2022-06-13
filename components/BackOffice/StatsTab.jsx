import React from "react";
import PropTypes from "prop-types";
import { Grid, Button, Stack } from "@mui/material";
import PieChart from "./PieChart";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

const StatsTab = (props) => {
  const { chartData } = props;
  const createFile = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const ws = XLSX.utils.json_to_sheet(
      chartData.yearlyPublicationsByCategories
    );
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, "test" + fileExtension);
  };

  return (
    <Grid container>
      <Grid item xs={11}>
        <Grid item xs={5}>
          <PieChart
            chartData={chartData?.yearlyPublicationsByCategories}
            title="Création de ressources par catégories"
          />
        </Grid>
      </Grid>
      <Grid item xs={1}>
        <Stack justifyContent="flex-end">
          <Button variant="bleuBtn" onClick={() => createFile()}>
            Exporter
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

StatsTab.propTypes = {
  chartData: PropTypes.array,
};
export default StatsTab;
