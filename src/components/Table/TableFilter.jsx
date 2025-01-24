import React, { useActionState, useRef } from "react";
import {
  Tune as TuneIcon,
  CleaningServices as CleaningServicesIcon,
} from "@mui/icons-material";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { localStorageArtisan } from "@/helpers";
import dataHandler from "@/utils/data-handler";

const TableFilter = ({ onFilter, queryParamsLocalStorageKey, filterItems }) => {
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
  };
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
      <IconButton
        id="table-clean-button"
        onClick={cleanFilterHandler}
        type="button"
      >
        <CleaningServicesIcon />
      </IconButton>
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
          <Button
            type="button"
            onClick={cleanFilterHandler}
            color="warning"
            variant="contained"
          >
            <CleaningServicesIcon />
          </Button>
        </MenuItem>
      </Menu>
    </form>
  );
};

export default TableFilter;
