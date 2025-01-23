import { TextField } from "@mui/material";
import React from "react";

const FormInput = ({ name, label, inputs = {}, errors = {} }) => {
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      fullWidth
      variant={`standard`}
      defaultValue={inputs[name]}
      error={!!errors[name]}
      helperText={errors[name]}
    />
  );
};

export default FormInput;
