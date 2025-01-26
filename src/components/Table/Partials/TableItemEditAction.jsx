import React from "react";
import { Edit as EditIcon } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useTranslations } from "use-intl";

const TableItemEditAction = ({ onEdit }) => {
  const t = useTranslations("Tables.Table");
  return (
    <Tooltip title={t("edit_label")}>
      <IconButton color="primary" onClick={onEdit}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TableItemEditAction;
