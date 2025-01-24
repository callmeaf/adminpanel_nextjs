"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PageLoader = () => {
  return (
    <DashboardLayout>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </DashboardLayout>
  );
};

export default PageLoader;
