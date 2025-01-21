import React from "react";
import DatePicker from "../DatePicker/DatePicker";
import { useTranslations } from "use-intl";
import { Grid2 } from "@mui/material";
import moment from "moment-jalaali";
import { localStorageArtisan } from "@/helpers";
import DateTimeFormat from "@/constants/DateTimeFormat";

const TableDatePicker = ({
  onFromDateChange,
  onToDateChange,
  queryParamsLocalStorageKey,
}) => {
  const t = useTranslations("Tables.Table");
  const { get, replace } = localStorageArtisan();
  const tableParams = get(queryParamsLocalStorageKey, {
    created_from: moment()
      .subtract(1, "year")
      .format(DateTimeFormat.DATE_TIME_WITH_DASH),
    created_to: moment().format(DateTimeFormat.DATE_TIME_WITH_DASH),
  });

  const fromDateChangeHandler = (newDate) => {
    tableParams.created_from = moment(newDate).format(
      DateTimeFormat.DATE_TIME_WITH_DASH
    );
    onFromDateChange({
      params: tableParams,
    });
    replace(queryParamsLocalStorageKey, tableParams);
  };

  const toDateChangeHandler = (newDate) => {
    tableParams.created_to = moment(newDate).format(
      DateTimeFormat.DATE_TIME_WITH_DASH
    );
    onToDateChange({
      params: tableParams,
    });
    replace(queryParamsLocalStorageKey, tableParams);
  };
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
        <DatePicker
          id={"created_from"}
          name={"created_from"}
          label={t("created_from_label")}
          defaultValue={moment(tableParams.created_from)}
          onChange={fromDateChangeHandler}
        />
      </Grid2>
      <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
        <DatePicker
          id={"created_to"}
          name={"created_to"}
          label={t("created_to_label")}
          defaultValue={moment(tableParams.created_to)}
          onChange={toDateChangeHandler}
        />
      </Grid2>
    </Grid2>
  );
};

export default TableDatePicker;
