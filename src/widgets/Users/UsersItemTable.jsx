import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";

const UsersItemTable = ({ user, index, startFrom, onEdit, onDelete }) => {
  return (
    <TableRow>
      <TableCell>{startFrom + index}</TableCell>
      <TableCell>{user.fullName}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.mobile}</TableCell>
      <TableCell>{user.createdAtText}</TableCell>
      <TableCell>
        <TableActions
          onEdit={() => {
            onEdit({
              replaces: {
                user_id: user.id,
              },
            });
          }}
          onDelete={() =>
            onDelete({
              userId: user.id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default UsersItemTable;
