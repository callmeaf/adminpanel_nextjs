import { Grid2 } from "@mui/material";
import React from "react";
import TableItemEditAction from "./Partials/TableItemEditAction";
import TableItemDeleteAction from "./Partials/TableItemDeleteAction";

const TableActions = ({ onEdit, onDelete }) => {
  return (
    <Grid2 container spacing={0.5}>
      {onEdit && (
        <Grid2>
          <TableItemEditAction onEdit={onEdit} />
        </Grid2>
      )}
      {onDelete && (
        <Grid2>
          <TableItemDeleteAction onDelete={onDelete} />
        </Grid2>
      )}
    </Grid2>
  );
};

export default TableActions;
