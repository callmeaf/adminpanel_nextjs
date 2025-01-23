import React from "react";
import { TipsAndUpdates as TipsAndUpdatesIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
const TableItemStatus = ({
  status,
  statusConfig = {
    1: "success",
    2: "error",
    3: "warning",
  },
}) => {
  return (
    <IconButton color={statusConfig[status]}>
      <TipsAndUpdatesIcon />
    </IconButton>
  );
};

export default TableItemStatus;
