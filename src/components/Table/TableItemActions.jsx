import { Grid2, IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import React from "react";

const TableActions = ({ onEdit, onDelete }) => {
  return (
    <Grid2 container spacing={0.5}>
      {onEdit && (
        <Grid2>
          <IconButton color="primary" onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Grid2>
      )}
      {onDelete && (
        <Grid2>
          <IconButton color="error" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Grid2>
      )}
    </Grid2>
  );
};

export default TableActions;
