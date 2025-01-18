import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const UsersItemTable = ({user}) => {
    return (
        <TableRow>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.mobile}</TableCell>
        </TableRow>
    );
};

export default UsersItemTable;