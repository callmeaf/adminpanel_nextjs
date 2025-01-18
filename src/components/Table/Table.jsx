import * as React from 'react';
import {Table as MUITable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

export default function Table({heads, loading, children}) {
    return (
        <TableContainer component={Paper}>
            <MUITable sx={{
                minWidth: 650,
                filter: loading ? 'blur(4px)' : 'none',
                pointerEvents: loading ? 'none' : 'initial'
            }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {heads.map(head => (
                            <TableCell key={head.id}>{head.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {children}
                </TableBody>
            </MUITable>
        </TableContainer>
    );
}