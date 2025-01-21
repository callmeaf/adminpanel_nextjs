"use client";

import { IconButton } from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import React from "react";
import { useRouter } from "@/i18n/routing";

const PageBackButton = ({ href }) => {
  const router = useRouter();

  const backHandler = () => router.push(href);
  return (
    <IconButton onClick={backHandler}>
      <ArrowBackIcon />
    </IconButton>
  );
};

export default PageBackButton;
