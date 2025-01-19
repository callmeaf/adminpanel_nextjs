import React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const UsersItemTable = ({user,index,startFrom}) => {
    return (
        <TableRow>
            <TableCell>{startFrom + index}</TableCell>
            <TableCell>{user.fullName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.mobile}</TableCell>
            <TableCell>{user.createdAtText}</TableCell>
        </TableRow>
    );
};

export default UsersItemTable;