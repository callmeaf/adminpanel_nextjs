'use client'

import React from 'react';
import DashboardLayout from "@/components/Layout/DashboardLayout";
import UsersTable from "@/widgets/Users/UsersTable";

const UsersPage = () => {

    return (
        <DashboardLayout>
            <h1>Users Page</h1>
            <UsersTable/>
        </DashboardLayout>
    );
};

export default UsersPage;