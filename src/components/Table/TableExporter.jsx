import React from "react";
import { FileDownload as FileDownloadIcon } from "@mui/icons-material";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";

const TableExporter = ({ onExcelExport }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box component={"div"}>
      <IconButton
        id="table-exporter-button"
        aria-controls={open ? "table-exporter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        type="button"
      >
        <FileDownloadIcon />
      </IconButton>

      <Menu
        id="table-exporter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "table-exporter-button",
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
        <MenuItem>
          <Button onClick={onExcelExport} fullWidth>
            Excel
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TableExporter;
