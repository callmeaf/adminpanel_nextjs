import { TextField } from "@mui/material";
import React from "react";

const FormInput = ({
  name,
  label,
  inputs = {},
  errors = {},
  defaultValue,
  ...otherProps
}) => {
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      fullWidth
      variant={`standard`}
      defaultValue={defaultValue ?? inputs[name]}
      error={!!errors[name]}
      helperText={errors[name]}
      {...otherProps}
    />
  );
};

export default FormInput;
