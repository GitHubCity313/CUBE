import React from "react";
import { Typography, TextField } from "@mui/material";
import frLocale from "date-fns/locale/fr";
import { getTime } from "date-fns";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateTimePicker } from "@mui/lab";
import PropTypes from "prop-types";

const DatePicker = (props) => {
  const { onChange, value, minDate, label, pickerLabel, isEvent } = props;
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={frLocale}>
      <Typography
        variant="body1"
        sx={{ color: isEvent ? "gov.blue" : "gov.mediumGlycine" }}
      >
        {label}
      </Typography>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        minDate={minDate}
        label={pickerLabel}
        value={value}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
};

DateTimePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  minDate: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  pickerLabel: PropTypes.string.isRequired,
  isEvent: PropTypes.bool.isRequired,
};

export default DatePicker;
