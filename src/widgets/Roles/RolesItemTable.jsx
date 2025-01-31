import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";

const RolesItemTable = ({ role, index, startFrom, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{startFrom + index}</TableCell>
      <TableCell>{role.fullName}</TableCell>
      <TableCell>{role.createdAtText}</TableCell>
      <TableCell>
        <TableActions
          onEdit={() => {
            onEdit({
              replaces: {
                role_id: role.id,
              },
            });
          }}
          onDelete={() =>
            onDelete({
              role_id: role.id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default RolesItemTable;
