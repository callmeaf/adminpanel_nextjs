import { Box, Skeleton } from "@mui/material";
import React from "react";

const TableSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </Box>
  );
};

export default TableSkeleton;
