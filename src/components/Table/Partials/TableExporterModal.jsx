import { localStorageArtisan } from "@/helpers";
import { Button, Grid2, Modal, Box, Typography } from "@mui/material";
import React from "react";
import { useTranslations } from "use-intl";

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

const TableExporterModal = ({
  queryParamsLocalStorageKey,
  open = false,
  onClose,
  onExportAllPage,
  onExportCurrentPage,
}) => {
  const t = useTranslations("Tables.Table");

  const { get } = localStorageArtisan();
  return (
    <Modal keepMounted open={open} onClose={onClose}>
      <Box sx={modalContentStyle}>
        <Typography variant="h6" component="h2" marginBottom={3}>
          {t("export_modal_title")}
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              onClick={onExportAllPage}
            >
              {t("export_all_page_button_label")}
            </Button>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              fullWidth
              onClick={onExportCurrentPage}
            >
              {t("export_current_page_button_label", {
                page: get(queryParamsLocalStorageKey, {})["page"] ?? 1,
              })}{" "}
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
};

export default TableExporterModal;
