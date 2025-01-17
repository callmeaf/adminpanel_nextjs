'use client'

import React from 'react';
import {Grid2} from "@mui/material";
import DashboardDrawer from "@/widgets/Dashboard/DashboardDrawer";
import DashboardNavbar from "@/widgets/Dashboard/DashboardNavbar";
import BaseLayout from "@/components/Layout/BaseLayout";

const DashboardLayout = ({children}) => {
    return (
        <BaseLayout>
            <Grid2 container>
                <Grid2 size={'auto'}>
                    <DashboardDrawer/>
                </Grid2>
                <Grid2 size={'grow'}>
                    <DashboardNavbar/>
                    {children}
                </Grid2>
            </Grid2>
        </BaseLayout>
    );
};

export default DashboardLayout;