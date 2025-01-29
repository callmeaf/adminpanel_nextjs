import * as React from "react";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Avatar, Box } from "@mui/material";

export default function FormFile({ name, label, inputs = {}, errors = {} }) {
  const [image, setImage] = React.useState(inputs[name]);

  return (
    <Box component={"div"} sx={{ display: "flex", gap: 3 }}>
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

      {image && (
        <Avatar
          alt={image instanceof File ? image.name : image.fileName}
          src={image instanceof File ? URL.createObjectURL(image) : image.url}
        />
      )}
    </Box>
  );
}
