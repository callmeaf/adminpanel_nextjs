import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { LinearProgress } from "@mui/material";

const PageLoader = () => {
  return (
    <DashboardLayout>
      <LinearProgress />
    </DashboardLayout>
  );
};

export default PageLoader;
