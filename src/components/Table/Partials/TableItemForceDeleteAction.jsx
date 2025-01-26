import React, { useState } from "react";
import {
  DeleteForever as DeleteForeverIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import Show from "@/components/Show";
import { useTranslations } from "next-intl";

let forceDeleteLoadingTimeout;

const TableItemForceDeleteAction = ({ onForceDelete }) => {
  const t = useTranslations("Tables.Table");

  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirmHandler = () => {
    if (confirmed) {
      setConfirmed(false);
    } else {
      setLoading(true);
      if (forceDeleteLoadingTimeout) {
        clearTimeout(forceDeleteLoadingTimeout);
      }
      forceDeleteLoadingTimeout = setTimeout(() => {
        setLoading(false);
        setConfirmed(true);
      }, 500);
    }
  };

  return (
    <Show
      when={confirmed}
      whenChild={() => (
        <>
          <Tooltip title={t("confirm_delete_action_label")}>
            <IconButton color="success" onClick={onForceDelete}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("cancel_delete_action_label")}>
            <IconButton color="error" onClick={confirmHandler}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
      elseChild={() => (
        <Tooltip title={t("force_delete_label")}>
          <IconButton color="error" onClick={confirmHandler} loading={loading}>
            <DeleteForeverIcon />
          </IconButton>
        </Tooltip>
      )}
    />
  );
};

export default TableItemForceDeleteAction;
