import * as React from 'react';
import {
    Table as MUITable,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid2
} from '@mui/material';
import TablePagination from "@/components/Table/TablePagination";
import TableSearch from "@/components/Table/TableSearch";

export default function Table({heads, loading, children, pagination, onPageChange, t, onSearch, searchParams}) {
    return (
        <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12, md: 6, lg: 4}}>
                <TableSearch t={t} onSearch={onSearch} searchParams={searchParams}/>
            </Grid2>
            <Grid2 size={12}>
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
            </Grid2>
            <Grid2 size={12}>
                <TablePagination pagination={pagination} onPageChange={onPageChange}/>
            </Grid2>
        </Grid2>

    );
}