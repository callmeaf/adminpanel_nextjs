import React from "react";
import { FileDownload as FileDownloadIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import useModal from "@/hooks/use-modal";
import TableExporterModal from "./Partials/TableExporterModal";
import { localStorageArtisan } from "@/helpers";
import { useTranslations } from "use-intl";

const TableExporter = ({ queryParamsLocalStorageKey, onExcelExport }) => {
  const t = useTranslations("Tables.Table");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    open: modalOpen,
    openHandler: modalOpenHandler,
    closeHandler: modalCloseHandler,
    state: modalState,
  } = useModal();

  const { get, replace } = localStorageArtisan();
  const exportHandler = () => {
    switch (modalState.exportType) {
      case "excel":
        onExcelExport();
        break;
      default:
        console.error(`Export Type not found: ${modalState.exportType}`);
    }

    modalCloseHandler();
    replace(queryParamsLocalStorageKey, {
      per_page: modalState.perPage,
    });
  };

  const exportAllPageHandler = () => {
    replace(queryParamsLocalStorageKey, {
      per_page: "all",
    });

    exportHandler();
  };

  const exportCurrentPageHandler = () => {
    replace(
      queryParamsLocalStorageKey,
      {
        per_page: get(queryParamsLocalStorageKey, {})["per_page"],
      },
      {
        deleteEmptyValues: true,
      }
    );
    exportHandler();
  };

  const excelExportButtonClickHandler = () => {
    modalOpenHandler({
      perPage: get(queryParamsLocalStorageKey, {})["per_page"],
      exportType: "excel",
    });
  };

  return (
    <>
      <Box component={"div"}>
        <Tooltip title={t("export_label")}>
          <IconButton
            id="table-exporter-button"
            aria-controls={open ? "table-exporter-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            type="button"
          >
            <FileDownloadIcon />
          </IconButton>
        </Tooltip>

        <Menu
          id="table-exporter-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "table-exporter-button",
          }}
          marginThreshold={0}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          slotProps={{
            paper: {
              sx: {
                width: "100%",
                maxWidth: "400px",
              },
            },
            root: {
              disablePortal: true,
            },
          }}
        >
          {onExcelExport && (
            <MenuItem sx={{ padding: 0 }}>
              <Button onClick={excelExportButtonClickHandler} fullWidth>
                {t("export_excel_label")}
              </Button>
            </MenuItem>
          )}
        </Menu>
      </Box>
      <TableExporterModal
        open={modalOpen}
        onClose={modalCloseHandler}
        queryParamsLocalStorageKey={queryParamsLocalStorageKey}
        onExportAllPage={exportAllPageHandler}
        onExportCurrentPage={exportCurrentPageHandler}
      />
    </>
  );
};

export default TableExporter;
