'use client'

import React from 'react';
import DashboardLayout from "@/components/Layout/DashboardLayout";
import DashboardCard from "@/widgets/Dashboard/DashboardCard";

const DashboardPage = () => {

    return (
        <DashboardLayout>
            <DashboardCard/>
        </DashboardLayout>
    );
};

export default DashboardPage;