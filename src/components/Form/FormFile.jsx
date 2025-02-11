import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Alert, Avatar, Box, IconButton, Tooltip } from "@mui/material";
import { typeOf } from "@/helpers";
import { Close as CloseIcon } from "@mui/icons-material";
import useModal from "@/hooks/use-modal";
import ConfirmModal from "../Modals/ConfirmModal";
import useApi from "@/hooks/use-api";
import { deleteMedia } from "@/thunks/media-thunks";
import { useTranslations } from "use-intl";

export default function FormFile({
  number,
  name,
  label,
  inputs = {},
  errors = {},
  onContextMenu,
}) {
  const t = useTranslations("Forms.Form");

  const [image, setImage] = React.useState(inputs[name]);

  const { isUploadedFile } = typeOf(image);

  const { open, openHandler, closeHandler } = useModal();

  const { handle } = useApi();

  const deleteMediaHandler = async () => {
    if (image.id) {
      await handle(deleteMedia, {
        payload: {
          media_id: image.id,
        },
      });
    }

    closeHandler();
    setImage(null);
  };

  return (
    <Box
      component={"div"}
      sx={{ display: "flex", gap: 3 }}
      onContextMenu={() => onContextMenu(number)}
    >
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        {label}
        <input
          type="file"
          id={name}
          name={name}
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Button>

      {errors[name] && <Alert title={errors[name]} security="error" />}
      {image && (
        <Box component={"div"} position={"relative"} className="group">
          <Tooltip title={t("file_delete_tooltip")}>
            <IconButton
              sx={{ position: "absolute", top: "-25px", right: "-25px" }}
              color="error"
              className="media_delete_button hidden group-hover:flex"
              onClick={openHandler}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
          <Avatar
            className="media_avatar"
            alt={isUploadedFile ? image.name : image.fileName}
            src={isUploadedFile ? URL.createObjectURL(image) : image.url}
          />
        </Box>
      )}

      <ConfirmModal
        open={open}
        onClose={closeHandler}
        onCancel={closeHandler}
        onConfirm={deleteMediaHandler}
      />
    </Box>
  );
}
