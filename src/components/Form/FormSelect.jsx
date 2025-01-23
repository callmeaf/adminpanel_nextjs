import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

const FormSelect = ({
  name,
  label,
  inputs = {},
  errors = {},
  options = [],
}) => {
  return (
    <FormControl fullWidth size="small" error={!!errors[name]}>
      <InputLabel id={`${name}_label`}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        id={name}
        name={name}
        label={label}
        variant="standard"
        defaultValue={inputs[name]}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors[name]}</FormHelperText>
    </FormControl>
  );
};

export default FormSelect;
