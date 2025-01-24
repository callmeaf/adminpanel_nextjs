import { Grid2 } from "@mui/material";
import React from "react";
import TableItemEditAction from "./Partials/TableItemEditAction";
import TableItemDeleteAction from "./Partials/TableItemDeleteAction";
import TableItemRestoreAction from "./Partials/TableItemRestoreAction";
import TableItemForceDeleteAction from "./Partials/TableItemForceDeleteAction";

const TableActions = ({ onEdit, onDelete, onRestore, onForceDelete }) => {
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
      {onRestore && (
        <Grid2>
          <TableItemRestoreAction onRestore={onRestore} />
        </Grid2>
      )}
      {onForceDelete && (
        <Grid2>
          <TableItemForceDeleteAction onForceDelete={onForceDelete} />
        </Grid2>
      )}
    </Grid2>
  );
};

export default TableActions;
