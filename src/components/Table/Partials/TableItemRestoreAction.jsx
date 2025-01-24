import React from "react";
import { SettingsBackupRestore as SettingsBackupRestoreIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const TableItemRestoreAction = ({ onRestore }) => {
  return (
    <IconButton color="warning" onClick={onRestore}>
      <SettingsBackupRestoreIcon />
    </IconButton>
  );
};

export default TableItemRestoreAction;
