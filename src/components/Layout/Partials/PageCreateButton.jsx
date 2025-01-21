"use client";

import { IconButton } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import React from "react";
import { useRouter } from "@/i18n/routing";

const PageCreateButton = ({ href }) => {
  const router = useRouter();

  const createHandler = () => router.push(href);
  return (
    <IconButton onClick={createHandler} color="primary">
      <AddIcon />
    </IconButton>
  );
};

export default PageCreateButton;
