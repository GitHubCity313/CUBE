import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const TypeRadio = (props) => {
  const { onChange, value, label, isEvent } = props;
  return (
    <FormControl>
      <FormLabel
        id="event-type"
        variant="body1"
        sx={{ color: isEvent ? "gov.mediumGlycine" : "gov.blue" }}
      >
        {label}
      </FormLabel>
      <RadioGroup name="radio-buttons-group" value={value} onChange={onChange}>
        <FormControlLabel value="event" control={<Radio />} label="Evénement" />
        <FormControlLabel
          value="association"
          control={<Radio />}
          label="Association"
        />
      </RadioGroup>
    </FormControl>
  );
};

TypeRadio.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isEvent: PropTypes.bool.isRequired,
};

export default TypeRadio;
