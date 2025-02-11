import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";
import TableItemStatus from "@/components/Table/Partials/TableItemStatus";
import TableItemType from "@/components/Table/Partials/TableItemType";

const UsersItemTable = ({
  user,
  index,
  startFrom,
  onEdit,
  onStatusUpdate,
  onDelete,
}) => {
  const editHandler = () => {
    onEdit({
      replaces: {
        user_id: user.id,
      },
    });
  };

  const deleteHandler = () => {
    onDelete({
      user_id: user.id,
    });
  };
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
        <TableItemStatus
          itemId={user.id}
          status={user.status}
          onStatusUpdate={onStatusUpdate}
          statusConfig={{
            1: "success",
            2: "error",
            3: "warning",
          }}
        />
      </TableCell>
      <TableCell>{user.createdAtText}</TableCell>
      <TableCell>
        <TableActions onEdit={editHandler} onDelete={deleteHandler} />
      </TableCell>
    </TableRow>
  );
};

export default UsersItemTable;
