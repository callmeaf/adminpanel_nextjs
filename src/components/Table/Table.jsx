import * as React from "react";
import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid2,
} from "@mui/material";
import TablePagination from "@/components/Table/TablePagination";
import TableSearch from "@/components/Table/TableSearch";
import { useTranslations } from "next-intl";
import TableDatePicker from "./TableDatePicker";

export default function Table({
  id,
  heads,
  loading,
  children,
  pagination,
  onPageChange,
  onPerPageChange,
  onDateChange,
  t,
  onSearch,
  searchParams,
  filter,
}) {
  const translateTable = useTranslations("Tables.Table");

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <TableSearch
          t={t}
          onSearch={onSearch}
          searchParams={searchParams}
          queryParamsLocalStorageKey={id}
        />
        {filter}
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }} offset={4}>
        <TableDatePicker
          onDateChange={onDateChange}
          queryParamsLocalStorageKey={id}
        />
      </Grid2>
      <Grid2 size={12}>
        <TableContainer component={Paper}>
          <MUITable
            sx={{
              minWidth: 650,
              filter: loading ? "blur(4px)" : "none",
              pointerEvents: loading ? "none" : "initial",
            }}
            aria-label="simple table"
          >
            <caption
              hidden={pagination.meta.total !== 0}
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 16 }}
            >
              {translateTable("no_data")}
            </caption>
            <TableHead>
              <TableRow>
                {heads.map((head) => (
                  <TableCell key={head.id}>{head.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{children}</TableBody>
          </MUITable>
        </TableContainer>
      </Grid2>
      <Grid2 size={12}>
        <TablePagination
          pagination={pagination}
          onPageChange={onPageChange}
          onPerPageChange={onPerPageChange}
          queryParamsLocalStorageKey={id}
        />
      </Grid2>
    </Grid2>
  );
}
