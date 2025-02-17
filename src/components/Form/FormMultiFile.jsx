import React, { useState } from "react";
import FormFile from "./FormFile";
import { Box, IconButton, Tooltip } from "@mui/material";
import { AddToPhotos as AddToPhotosIcon } from "@mui/icons-material";
import { arrayArtisan } from "@/helpers";
import { useTranslations } from "next-intl";

const { makeFromNumbers } = arrayArtisan();

const FormMultiFile = ({ name, label, inputs = {}, errors = {} }) => {
  const t = useTranslations("Forms.Form");

  const [numbers, setNumbers] = useState(
    makeFromNumbers(inputs[name] ? inputs[name].length : 1)
  );

  const getImage = (index) => {
    if (!(inputs[name] && inputs[name][index])) {
      return;
    }

    return inputs[name][index];
  };

  const moreImageHandler = () => {
    setNumbers([
      ...numbers,
      {
        id: numbers.length + 1,
      },
    ]);
  };

  const removeImageHandler = (number) => {
    setNumbers(
      numbers.filter((item) => item.id.toString() !== number.id.toString())
    );
  };
  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {numbers.map((number, index) => (
        <FormFile
          key={number.id}
          number={number}
          name={`${name}[]`}
          label={`${label} ( ${index + 1} )`}
          inputs={{
            [`${name}[]`]: getImage(index),
          }}
          onRemoveImageButton={removeImageHandler}
        />
      ))}
      <Tooltip title={t("more_files_tooltip")}>
        <IconButton onClick={moreImageHandler}>
          <AddToPhotosIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default FormMultiFile;
