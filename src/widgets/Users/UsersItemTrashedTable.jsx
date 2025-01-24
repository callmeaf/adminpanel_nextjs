import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";
import TableItemStatus from "@/components/Table/Partials/TableItemStatus";
import TableItemType from "@/components/Table/Partials/TableItemType";

const UsersItemTrashedTable = ({
  user,
  index,
  startFrom,
  onRestore,
  onForceDelete,
}) => {
  return (
    <TableRow>
      <TableCell>{startFrom + index}</TableCell>
      <TableCell>
        {user.fullName}
        <TableItemType
          type={user.type}
          typeText={user.typeText}
          typeConfig={user.typeBadgeConfig}
        />
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.mobile}</TableCell>
      <TableCell>
        <TableItemStatus userId={user.id} status={user.status} />
      </TableCell>
      <TableCell>{user.deletedAtText}</TableCell>
      <TableCell>
        <TableActions
          onRestore={() => {
            onRestore({
              user_id: user.id,
            });
          }}
          onForceDelete={() =>
            onForceDelete({
              user_id: user.id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default UsersItemTrashedTable;
