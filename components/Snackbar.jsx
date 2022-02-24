import React from "react";
import { Typography, Alert, Snackbar } from "@mui/material";

export default function CustomSnackbar(props) {
  const { open, onClick, message, severity } = props;

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClick={onClick}
      onClose={onClick}
      sx={{ display: "flex", alignItems: "center" }}
    >
      <Alert severity={severity}>
        <Typography
          sx={{ color: severity === "success" ? "white" : "gov.darkTuile" }}
        >
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
}
