import React from "react";
import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const TableItemEditAction = ({ onEdit }) => {
  return (
    <IconButton color="primary" onClick={onEdit}>
      <EditIcon />
    </IconButton>
  );
};

export default TableItemEditAction;
