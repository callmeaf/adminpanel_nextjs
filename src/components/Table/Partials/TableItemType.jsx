import { Chip } from "@mui/material";
import React from "react";

const TableItemType = ({
  type,
  typeText,
  typeConfig = {
    1: "success",
    2: "error",
    3: "warning",
  },
}) => {
  return (
    <Chip
      label={typeText}
      color={typeConfig[type]}
      sx={{ display: "table-cell" }}
      size="small"
    />
  );
};

export default TableItemType;
