import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

let formAutoCompleteSearchTimeout;

const FormAutoComplete = ({
  name,
  label,
  errors = {},
  options = [],
  onOpen,
  loading,
  defaultValue = {
    label: "",
    value: "",
  },
  onlyLoadIfOptionLoaded = false,
  multiple = false,
  onScroll,
  onSearch,
}) => {
  const t = useTranslations("Forms.Form");
  if (onlyLoadIfOptionLoaded && options.length === 0) {
    return;
  }

  const scrollHandler = (event) => {
    if (!onScroll) {
      return;
    }
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.offsetHeight >=
      listboxNode.scrollHeight // فاصله مشخصی تا انتهای لیست
    ) {
      onScroll();
    }
  };

  const searchHandler = (event, value, reason) => {
    if (!onSearch) {
      return;
    }
    if (formAutoCompleteSearchTimeout) {
      clearTimeout(formAutoCompleteSearchTimeout);
    }
    formAutoCompleteSearchTimeout = setTimeout(() => {
      onSearch({
        searchValue: value.toString().trim(),
      });
    }, 500);
  };
  return (
    <Autocomplete
      onInputChange={searchHandler}
      onOpen={onOpen}
      options={options}
      getOptionLabel={(option) => option.label ?? ""}
      isOptionEqualToValue={(option, value) =>
        option.value?.toString() === value.value?.toString()
      }
      defaultValue={defaultValue?.value ? defaultValue : undefined}
      loading={loading}
      loadingText={t("loading_label")}
      multiple={multiple}
      slotProps={{
        listbox: {
          onScroll: scrollHandler,
        },
      }}
      renderInput={(params) => {
        return (
          <>
            <TextField
              {...params}
              fullWidth
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
                options.length === 0
                  ? defaultValue.value
                  : options.find(
                      (option) =>
                        option.label?.toString() ===
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
