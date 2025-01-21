"use client";

import React from "react";
import { Grid2 } from "@mui/material";
import DashboardDrawer from "@/widgets/Dashboard/DashboardDrawer";
import DashboardNavbar from "@/widgets/Dashboard/DashboardNavbar";
import BaseLayout from "@/components/Layout/BaseLayout";
import Card from "@/components/Card/Card";

const DashboardLayout = ({ children }) => {
  return (
    <BaseLayout>
      <Grid2 container>
        <Grid2 size={"auto"}>
          <DashboardDrawer />
        </Grid2>
        <Grid2 size={"grow"}>
          <DashboardNavbar />
          <Card sx={{ position: "relative" }}>{children}</Card>
        </Grid2>
      </Grid2>
    </BaseLayout>
  );
};

export default DashboardLayout;
