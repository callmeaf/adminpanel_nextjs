import React from "react";
import { Tune as TuneIcon } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Paper } from "@mui/material";

const TableFilter = ({ onFilter, queryParamsLocalStorageKey, filterItems }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <form>
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

      <Menu
        id="table-filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "table-filter-button",
        }}
        marginThreshold={0}
        slotProps={{
          paper: {
            sx: {
              width: "100%",
              maxWidth: "400px",
            },
          },
        }}
      >
        {filterItems}
      </Menu>
    </form>
  );
};

export default TableFilter;
