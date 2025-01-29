import { arrayArtisan } from "@/helpers";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

let formAutoCompleteSearchTimeout;

const inputHiddenDefaultValue = ({
  multiple,
  options,
  params,
  defaultValue,
}) => {
  if (multiple) {
    const { unique } = arrayArtisan();

    let selectedLabels = [
      ...params.InputProps.startAdornment?.map((item) => item.props.label),
    ];
    if (defaultValue && defaultValue.length) {
      selectedLabels = [
        ...selectedLabels,
        ...defaultValue.map((item) => item.label),
      ];
    }
    selectedLabels = unique(selectedLabels);

    let selectedOptions;
    selectedOptions = [
      ...options.filter((option) => selectedLabels?.includes(option.label)),
    ];
    if (defaultValue && defaultValue.length) {
      selectedOptions = [...selectedOptions, ...defaultValue];
    }

    selectedOptions = unique(selectedOptions, "value");

    return selectedOptions;
  } else {
    if (options.length) {
      return options.find(
        (option) =>
          option.label?.toString() === params.inputProps.value?.toString()
      )?.value;
    } else {
      return defaultValue.value;
    }
  }
};

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
  const [searchValue, setSearchValue] = useState("");

  const scrollHandler = (event) => {
    if (!onScroll) {
      return;
    }
    const listboxNode = event.currentTarget;
    if (
      listboxNode.scrollTop + listboxNode.offsetHeight >=
      listboxNode.scrollHeight
    ) {
      onScroll({
        searchValue,
      });
    }
  };

  const searchHandler = (event, value, reason) => {
    if (!onSearch) {
      return;
    }
    if (!["selectOption", "reset"].includes(reason)) {
      setSearchValue(value.toString().trim());
    }
  };

  useEffect(() => {
    if (!onSearch) {
      return;
    }
    formAutoCompleteSearchTimeout = setTimeout(() => {
      onSearch({
        searchValue,
      });
    }, 500);

    return () => {
      if (formAutoCompleteSearchTimeout) {
        clearTimeout(formAutoCompleteSearchTimeout);
      }
    };
  }, [searchValue]);

  const inputDefaultValue = () => {
    if (multiple) {
      return defaultValue ?? undefined;
    }
    return defaultValue?.value ? defaultValue : undefined;
  };

  if (onlyLoadIfOptionLoaded && options.length === 0) {
    return;
  }

  return (
    <Autocomplete
      onInputChange={searchHandler}
      onOpen={onOpen}
      options={options}
      getOptionLabel={(option) => option.label ?? ""}
      isOptionEqualToValue={(option, value) =>
        option.value?.toString() === value.value?.toString()
      }
      inputValue={multiple ? searchValue : undefined}
      defaultValue={inputDefaultValue()}
      loading={loading}
      loadingText={t("loading_label")}
      multiple={multiple}
      disableCloseOnSelect={multiple}
      slotProps={{
        listbox: {
          onScroll: scrollHandler,
        },
      }}
      renderInput={(params) => {
        const inputHiddenValues = inputHiddenDefaultValue({
          multiple,
          options,
          params,
          defaultValue,
        });

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

            {multiple ? (
              inputHiddenValues.map((item, index) => (
                <input
                  key={item.value}
                  type="hidden"
                  id={`${name}[${index}]`}
                  name={`${name}[]`}
                  defaultValue={item.value}
                />
              ))
            ) : (
              <input
                type="hidden"
                id={name}
                name={name}
                defaultValue={inputHiddenValues}
              />
            )}
          </>
        );
      }}
    />
  );
};

export default FormAutoComplete;
