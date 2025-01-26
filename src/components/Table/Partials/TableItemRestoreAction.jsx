import React from "react";
import { SettingsBackupRestore as SettingsBackupRestoreIcon } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslations } from "use-intl";

const TableItemRestoreAction = ({ onRestore }) => {
  const t = useTranslations("Tables.Table");
  return (
    <Tooltip title={t("restore_label")}>
      <IconButton color="warning" onClick={onRestore}>
        <SettingsBackupRestoreIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TableItemRestoreAction;
