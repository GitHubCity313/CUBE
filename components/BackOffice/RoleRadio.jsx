import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Stack,
} from "@mui/material";

export default function RoleRadio({ currentRole, onChange }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="left">
      <FormControl>
        <RadioGroup
          name="radio-buttons-group"
          value={currentRole}
          onChange={onChange}
        >
          <FormControlLabel
            value="citoyen"
            control={<Radio />}
            label="Citoyen"
            sx={{ "& span": { fontSize: "12px", p: 0, m: 0.2 } }}
          />
          <FormControlLabel
            value="moderateur"
            control={<Radio />}
            label="Modérateur"
            sx={{ "& span": { fontSize: "12px", p: 0, m: 0.2 } }}
          />
          <FormControlLabel
            value="admin"
            control={<Radio />}
            label="Administrateur"
            sx={{ "& span": { fontSize: "12px", p: 0, m: 0.2 } }}
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}

RoleRadio.propTypes = {
  currentRole: PropTypes.string.isRequired,
};
