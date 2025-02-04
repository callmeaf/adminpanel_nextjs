import { Cancel as CancelIcon, Check as CheckIcon } from "@mui/icons-material";
import { Box, Button, Grid2, Modal, Tooltip, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

const modalContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ConfirmModal = ({ open, onClose, title, onConfirm, onCancel }) => {
  const t = useTranslations("Common.Modals");
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalContentStyle}>
        <Typography variant="h6" component="h2" marginBottom={3}>
          {title ?? t("confirm_modal_title")}
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Tooltip title={t("confirm_button_tooltip")}>
              <Button
                color="success"
                onClick={onConfirm}
                fullWidth
                variant="contained"
              >
                <CheckIcon />
              </Button>
            </Tooltip>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Tooltip title={t("cancel_button_tooltip")}>
              <Button
                color="default"
                onClick={onCancel}
                fullWidth
                variant="contained"
              >
                <CancelIcon />
              </Button>
            </Tooltip>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
