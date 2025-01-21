"use client";

import { Grid2 } from "@mui/material";
import React from "react";
import PageBackButton from "./PageBackButton";
import PageTitle from "./PageTitle";
import PageCreateButton from "./PageCreateButton";

const PageHeader = ({ title, backButtonUrl, createButtonUrl }) => {
  return (
    <Grid2 container spacing={2}>
      {title && (
        <Grid2 size={"grow"}>
          <PageTitle title={title} />
        </Grid2>
      )}
      {backButtonUrl && (
        <Grid2 size={1} textAlign={"end"}>
          <PageBackButton href={backButtonUrl} />
        </Grid2>
      )}
      {createButtonUrl && (
        <Grid2>
          <PageCreateButton href={createButtonUrl} />
        </Grid2>
      )}
    </Grid2>
  );
};

export default PageHeader;
