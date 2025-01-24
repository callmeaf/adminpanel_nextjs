import { LinearProgress } from "@mui/material";
import React from "react";

const TableLoading = ({ loading }) => {
  return <LinearProgress key={"loading"} hidden={!loading} />;
};

export default TableLoading;
