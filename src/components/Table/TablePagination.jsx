import React from "react";
import Show from "@/components/Show";
import {
  FormControl,
  Grid2,
  InputLabel,
  Pagination as MUIPagination,
  PaginationItem,
  Select,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import { localStorageArtisan } from "@/helpers";

const perPages = [15, 30, 50, 100];

const TablePagination = ({
  pagination,
  onPageChange,
  onPerPageChange,
  queryParamsLocalStorageKey,
}) => {
  const translateTable = useTranslations("Tables.Table");

  const { get, replace } = localStorageArtisan();
  const tableParams = get(queryParamsLocalStorageKey, {
    page: pagination.meta.currentPage,
    per_page: pagination.meta.perPage,
  });

  const pageChangeHandler = (page) => {
    tableParams.page = page;
    onPageChange({
      params: tableParams,
    });
    replace(queryParamsLocalStorageKey, tableParams);
  };

  const perPageChangeHandler = (e) => {
    const perPageValue = e.target.value.toString().trim();
    tableParams.per_page = perPageValue;
    tableParams.page = 1;

    replace(queryParamsLocalStorageKey, tableParams);

    onPerPageChange({
      params: tableParams,
    });
  };

  return (
    <Show
      when={pagination}
      whenChild={() => (
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <MUIPagination
              count={pagination.meta.lastPage}
              showFirstButton
              showLastButton
              color={"primary"}
              onChange={(e, page) => pageChangeHandler(page)}
              renderItem={(item) => {
                item.selected =
                  item.type === "page" &&
                  item.page.toString() ===
                    pagination.meta.currentPage.toString();
                return (
                  <PaginationItem
                    {...item}
                    sx={{ pointerEvents: item.selected ? "none" : "initial" }}
                  />
                );
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Box className={"flex justify-end items-center"}>
              <FormControl size={"small"}>
                <InputLabel id={"per_page_label"}>
                  {translateTable("per_page_label")}
                </InputLabel>
                <Select
                  labelId={"per_page_label"}
                  id={"per_page"}
                  label={translateTable("per_page_label")}
                  value={tableParams.per_page || perPages[0]}
                  onChange={perPageChangeHandler}
                >
                  {perPages.map((perPage) => (
                    <MenuItem key={perPage} value={perPage}>
                      {perPage}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography
                component={"span"}
                sx={{ mx: 0.3 }}
                fontWeight={"bold"}
              >
                {pagination.meta.from}
              </Typography>
              <Typography component={"span"} sx={{ mx: 0.3 }}>
                {translateTable("to")}
              </Typography>
              <Typography
                component={"span"}
                sx={{ mx: 0.3 }}
                fontWeight={"bold"}
              >
                {pagination.meta.to}
              </Typography>
              <Typography component={"span"} sx={{ mx: 0.3 }}>
                {translateTable("from")}
              </Typography>
              <Typography
                component={"span"}
                sx={{ mx: 0.3 }}
                fontWeight={"bold"}
              >
                {pagination.meta.total}
              </Typography>
              <Typography component={"span"} sx={{ mx: 0.3 }}>
                {translateTable("total")}
              </Typography>
            </Box>
          </Grid2>
        </Grid2>
      )}
    />
  );
};

export default TablePagination;
