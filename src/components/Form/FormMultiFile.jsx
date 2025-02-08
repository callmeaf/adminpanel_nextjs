import React, { useState } from "react";
import FormFile from "./FormFile";
import { Box, IconButton } from "@mui/material";
import { AddToPhotos as AddToPhotosIcon } from "@mui/icons-material";
import { arrayArtisan } from "@/helpers";

const { makeFromNumbers } = arrayArtisan();

const FormMultiFile = ({ name, label, inputs = {}, errors = {} }) => {
  const [numbers, setNumbers] = useState(makeFromNumbers(3));

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
          name={`${name}[]`}
          label={`${label} ( ${index + 1} )`}
          inputs={{
            name: getImage(index),
          }}
          onContextMenu={() => removeImageHandler(number)}
        />
      ))}
      <IconButton onClick={moreImageHandler}>
        <AddToPhotosIcon />
      </IconButton>
    </Box>
  );
};

export default FormMultiFile;
