import { Typography } from "@mui/material";
import React from "react";

const PageTitle = ({ title }) => {
  return (
    <Typography variant="h5" component={"div"} sx={{ marginBottom: 3 }}>
      {title}
    </Typography>
  );
};

export default PageTitle;
