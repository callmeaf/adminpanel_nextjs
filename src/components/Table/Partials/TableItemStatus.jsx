import React, { useState } from "react";
import { TipsAndUpdates as TipsAndUpdatesIcon } from "@mui/icons-material";
import { IconButton, Grow, Tooltip } from "@mui/material";
import { useTranslations } from "use-intl";

const TableItemStatus = ({
  userId,
  status,
  statusConfig = {
    1: "success",
    2: "error",
    3: "warning",
  },
  onStatusUpdate,
}) => {
  const t = useTranslations("Tables.Table");

  const [open, setOpen] = useState(false);

  const statusUpdateHandler = async (statusKey) => {
    await onStatusUpdate(userId, {
      status: statusKey,
    });

    setOpen(false);
  };
  return (
    <>
      <Tooltip title={t(`status_${statusConfig[status]}_label`)}>
        <IconButton
          color={statusConfig[status]}
          onClick={onStatusUpdate ? () => setOpen(!open) : null}
          sx={{ cursor: onStatusUpdate ? "pointer" : "auto" }}
        >
          <TipsAndUpdatesIcon />
        </IconButton>
      </Tooltip>

      {onStatusUpdate &&
        open &&
        Object.keys(statusConfig)
          .filter((statusKey) => statusKey.toString() !== status.toString())
          .map((statusKey, index) => (
            <Grow
              in={open}
              style={{ transformOrigin: "0 0 0" }}
              {...(open ? { timeout: (index + 1) * 500 } : {})}
              key={statusKey}
            >
              <Tooltip title={t(`status_${statusConfig[statusKey]}_label`)}>
                <IconButton
                  color={statusConfig[statusKey]}
                  onClick={() => statusUpdateHandler(statusKey)}
                >
                  <TipsAndUpdatesIcon />
                </IconButton>
              </Tooltip>
            </Grow>
          ))}
    </>
  );
};

export default TableItemStatus;
