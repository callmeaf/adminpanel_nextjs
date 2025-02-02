import React from "react";
import DatePicker from "../DatePicker/DatePicker";
import { useTranslations } from "use-intl";
import { Grid2 } from "@mui/material";
import moment from "moment-jalaali";
import { localStorageArtisan } from "@/helpers";
import DateTimeFormat from "@/constants/DateTimeFormat";
import { digitsFaToEn } from "@persian-tools/persian-tools";

const TableDatePicker = ({
  onDateChange,
  queryParamsLocalStorageKey,
  inTrashed = false,
}) => {
  const t = useTranslations("Tables.Table");
  const { get, replace } = localStorageArtisan();
  const tableParams = get(queryParamsLocalStorageKey, {
    created_from: undefined,
    created_to: undefined,
    deleted_from: undefined,
    deleted_to: undefined,
  });

  const fromDateChangeHandler = (newDate) => {
    newDate = moment(newDate);
    newDate = newDate.isValid()
      ? newDate.format(DateTimeFormat.DATE_TIME_WITH_DASH)
      : null;

    if (newDate) {
      newDate = digitsFaToEn(newDate);
    }
    if (inTrashed) {
      tableParams.deleted_from = newDate;
    } else {
      tableParams.created_from = newDate;
    }

    onDateChange({
      params: tableParams,
    });
    replace(queryParamsLocalStorageKey, tableParams);
  };

  const toDateChangeHandler = (newDate) => {
    newDate = moment(newDate);
    newDate = newDate.isValid()
      ? newDate.format(DateTimeFormat.DATE_TIME_WITH_DASH)
      : null;

    if (newDate) {
      newDate = digitsFaToEn(newDate);
    }
    if (inTrashed) {
      tableParams.deleted_to = newDate;
    } else {
      tableParams.created_to = newDate;
    }

    onDateChange({
      params: tableParams,
    });
    replace(queryParamsLocalStorageKey, tableParams);
  };

  const CreatedDates = () => {
    return (
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
          <DatePicker
            id={"created_from"}
            name={"created_from"}
            label={t("created_from_label")}
            defaultValue={
              tableParams.created_from
                ? moment(tableParams.created_from)
                : undefined
            }
            onChange={fromDateChangeHandler}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
          <DatePicker
            id={"created_to"}
            name={"created_to"}
            label={t("created_to_label")}
            defaultValue={
              tableParams.created_to
                ? moment(tableParams.created_to)
                : undefined
            }
            onChange={toDateChangeHandler}
          />
        </Grid2>
      </Grid2>
    );
  };

  const DeletedDates = () => {
    return (
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
          <DatePicker
            id={"deleted_from"}
            name={"deleted_from"}
            label={t("deleted_from_label")}
            defaultValue={
              tableParams.deleted_from
                ? moment(tableParams.deleted_from)
                : undefined
            }
            onChange={fromDateChangeHandler}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
          <DatePicker
            id={"deleted_to"}
            name={"deleted_to"}
            label={t("deleted_to_label")}
            defaultValue={
              tableParams.deleted_to
                ? moment(tableParams.deleted_to)
                : undefined
            }
            onChange={toDateChangeHandler}
          />
        </Grid2>
      </Grid2>
    );
  };

  if (inTrashed) {
    return <DeletedDates />;
  }

  return <CreatedDates />;
};

export default TableDatePicker;
