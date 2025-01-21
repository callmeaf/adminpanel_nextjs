import { Alert, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";
import { localStorageArtisan } from "@/helpers";

const TableRefresherData = ({ onRefresh, tableId }) => {
  const t = useTranslations("Tables.Table");

  const { remove } = localStorageArtisan();
  const refreshUsersDataWithoutAnyParams = () => {
    remove(tableId);
    onRefresh();
  };
  return (
    <div className="text-center">
      <Alert
        severity="error"
        sx={{ maxWidth: "fit-content", margin: "auto", marginBottom: 3 }}
      >
        {t("refresh_alert_label")}
      </Alert>
      <Button
        type="button"
        variant="contained"
        size="large"
        onClick={refreshUsersDataWithoutAnyParams}
      >
        {t("refresh_button_label")}
      </Button>
    </div>
  );
};

export default TableRefresherData;
