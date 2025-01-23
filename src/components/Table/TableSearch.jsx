import React, { useEffect, useRef } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Search as SearchIcon, Close as CloseIcon } from "@mui/icons-material";
import { useTranslations } from "next-intl";
import { localStorageArtisan } from "@/helpers";

let tableSearchTimeout;
const TableSearch = ({
  onSearch,
  t,
  searchParams,
  queryParamsLocalStorageKey,
}) => {
  const translateTable = useTranslations("Tables.Table");

  const { get, replace } = localStorageArtisan();
  const tableParams = get(queryParamsLocalStorageKey, {});
  const storedSearchInputValue =
    searchParams.length > 0 ? tableParams[searchParams[0]] ?? "" : "";

  const searchInputRef = useRef(null);

  const searchHandler = (e) => {
    if (tableSearchTimeout) {
      clearTimeout(tableSearchTimeout);
    }
    tableSearchTimeout = setTimeout(
      () => {
        addSearchParamsToQueryParams(
          searchInputRef.current.value.toString().trim()
        );
      },
      e ? 700 : 0
    );
  };

  const addSearchParamsToQueryParams = (value, refetchData = true) => {
    tableParams.page = 1;

    searchParams.forEach((searchParam) => {
      tableParams[searchParam] = value;
    });

    replace(queryParamsLocalStorageKey, tableParams, {
      deleteEmptyValues: true,
    });

    if (refetchData) {
      onSearch({
        params: tableParams,
      });
    }
  };

  useEffect(() => {
    if (searchInputRef) {
      searchInputRef.current.value = storedSearchInputValue;
    }
  }, []);

  return (
    <TextField
      onInput={searchHandler}
      id={"search"}
      name={"search"}
      label={`${translateTable("search_label")} ${searchParams
        .map((searchParam) => t(searchParam + "_label"))
        .join(", ")}`}
      size={"small"}
      variant={"outlined"}
      inputRef={searchInputRef}
      fullWidth
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: !!storedSearchInputValue && (
            <InputAdornment
              position="end"
              onClick={() => {
                searchInputRef.current.value = "";
                searchHandler();
              }}
              className="cursor-pointer"
            >
              <CloseIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default TableSearch;
