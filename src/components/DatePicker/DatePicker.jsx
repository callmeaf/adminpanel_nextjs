"use client";

import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker as MUIDatePicker } from "@mui/x-date-pickers/DatePicker";
import { useLocale } from "next-intl";
import moment from "moment-jalaali";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import fa from "moment/src/locale/fa";

moment.locale("fa", fa);
moment.loadPersian({
  usePersianDigits: true,
});

export default function DatePicker({
  id,
  name,
  label,
  defaultValue,
  onChange,
}) {
  const locale = useLocale();
  return (
    <LocalizationProvider
      dateAdapter={AdapterMomentJalaali}
      adapterLocale={locale}
    >
      <DemoContainer components={["DatePicker"]}>
        <MUIDatePicker
          label={label}
          defaultValue={defaultValue}
          onChange={onChange}
          slotProps={{
            textField: {
              size: "small",
              id,
              name,
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
