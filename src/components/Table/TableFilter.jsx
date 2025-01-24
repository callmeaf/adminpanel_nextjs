import React, { useActionState, useEffect, useRef, useState } from "react";
import {
  Tune as TuneIcon,
  CleaningServices as CleaningServicesIcon,
  PriorityHigh as PriorityHighIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { localStorageArtisan } from "@/helpers";
import dataHandler from "@/utils/data-handler";
import { useTranslations } from "next-intl";

let setFilteredDataTimeout;

const TableFilter = ({ onFilter, queryParamsLocalStorageKey, filterItems }) => {
  const t = useTranslations("Tables.Table");
  const [isFilteredData, setIsFilteredData] = useState(false);
  const tableFilterFormRef = useRef(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { get, replace } = localStorageArtisan();
  const tableParams = get(queryParamsLocalStorageKey, {});
  const filterHandler = async (prevState, formData) => {
    for (const [key, value] of formData) {
      tableParams[key] = value;
    }

    replace(queryParamsLocalStorageKey, tableParams, {
      deleteEmptyValues: true,
    });

    onFilter();
    handleClose();
    setIsFilteredData(true);
  };
  const [state, submitAction, isPending] = useActionState(
    filterHandler,
    tableParams
  );

  const cleanFilterHandler = () => {
    const formData = new FormData(tableFilterFormRef.current);
    const { resetAll } = dataHandler(formData);

    resetAll();
    filterHandler(undefined, formData);
    setIsFilteredData(false);
  };

  useEffect(() => {
    setFilteredDataTimeout = setTimeout(() => {
      const formData = new FormData(tableFilterFormRef.current);
      for (const [key] of formData) {
        if (tableParams.hasOwnProperty(key)) {
          setIsFilteredData(true);
        }
      }
    }, 1000);

    return () => {
      if (setFilteredDataTimeout) {
        clearTimeout(setFilteredDataTimeout);
      }
    };
  }, []);

  return (
    <form id="table-filter-form" action={submitAction} ref={tableFilterFormRef}>
      <IconButton
        id="table-filter-button"
        aria-controls={open ? "table-filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        type="button"
      >
        <TuneIcon />
      </IconButton>
      {isFilteredData && (
        <Tooltip title={t("filter_clean_button_tooltip")}>
          <IconButton
            id="table-clean-button"
            onClick={cleanFilterHandler}
            type="button"
            sx={{
              position: "relative",
            }}
          >
            <CleaningServicesIcon />
            <PriorityHighIcon
              fontSize="small"
              sx={{
                color: "red",
                position: "absolute",
                top: "0",
                right: "-3px",
                animation: "blinker 1.5s linear infinite",
                "@keyframes blinker": {
                  "50%": { opacity: 0 },
                },
              }}
            />
          </IconButton>
        </Tooltip>
      )}

      <Menu
        id="table-filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "table-filter-button",
        }}
        marginThreshold={0}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: "400px",
            },
          },
          root: {
            disablePortal: true,
          },
        }}
      >
        {filterItems}
        <MenuItem>
          <Button type="submit" color="primary" variant="contained">
            <TuneIcon />
          </Button>
          <Box sx={{ mx: 1 }} />
          {isFilteredData && (
            <Tooltip title={t("filter_clean_button_tooltip")}>
              <Button
                type="button"
                onClick={cleanFilterHandler}
                color="warning"
                variant="contained"
              >
                <CleaningServicesIcon />
              </Button>
            </Tooltip>
          )}
        </MenuItem>
      </Menu>
    </form>
  );
};

export default TableFilter;
