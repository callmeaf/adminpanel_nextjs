import { CircularProgress, TextField } from "@mui/material";
import React from "react";

const FormInput = ({
  name,
  label,
  inputs = {},
  errors = {},
  defaultValue,
  loading = false,
  ...otherProps
}) => {
  return (
    <>
      <TextField
        id={name}
        name={name}
        label={label}
        fullWidth
        variant={`standard`}
        defaultValue={defaultValue ?? inputs[name]}
        error={!!errors[name]}
        helperText={errors[name]}
        slotProps={{
          inputLabel: {
            shrink: name === "slug" ? true : undefined,
          },
        }}
        {...otherProps}
      />
      {loading && <CircularProgress />}
    </>
  );
};

export default FormInput;
