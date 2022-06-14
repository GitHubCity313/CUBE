import React, { useState } from "react";
import PropTypes from "prop-types";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DateSelect({ types, setActiveFilter, activeFilter }) {
  const [, setValue] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setActiveFilter({
      categories: activeFilter.categories,
      date: value,
    });
    return setValue(value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-name-label">Date prévue</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        value={activeFilter.date}
        onChange={handleChange}
        input={<OutlinedInput label="Date prévue" />}
        MenuProps={MenuProps}
      >
        {types.map((type) => (
          <MenuItem key={type.key} value={type.key}>
            {type.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

DateSelect.propTypes = {
  types: PropTypes.array,
  setActiveFilter: PropTypes.func.isRequired,
  activeFilter: PropTypes.object,
};
