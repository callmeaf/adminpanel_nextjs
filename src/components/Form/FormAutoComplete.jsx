import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

const FormAutoComplete = ({
  name,
  label,
  inputs = {},
  errors = {},
  options = [],
  onOpen,
  loading,
}) => {
  const t = useTranslations("Forms.Components");

  return (
    <Autocomplete
      onOpen={onOpen}
      options={options}
      getOptionLabel={(option) => option.label ?? ""}
      isOptionEqualToValue={(option, value) =>
        option.value?.toString() === value.value?.toString()
      }
      loading={loading}
      loadingText={t("loading_label")}
      renderInput={(params) => {
        return (
          <>
            <TextField
              {...params}
              label={label}
              variant="standard"
              error={!!errors[name]}
              helperText={errors[name]}
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {loading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                },
              }}
            />
            <input
              type="hidden"
              id={name}
              name={name}
              defaultValue={
                options.find(
                  (option) =>
                    option.label.toString() ===
                    params.inputProps.value?.toString()
                )?.value
              }
            />
          </>
        );
      }}
    />
  );
};

export default FormAutoComplete;
