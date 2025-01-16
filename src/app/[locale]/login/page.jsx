'use client'

import React from 'react';
import LoginWrapper from "@/widgets/Auth/LoginWrapper";
import BaseLayout from "@/components/Layout/BaseLayout";

const LoginPage = () => {
    return (
        <BaseLayout>
            <LoginWrapper/>
        </BaseLayout>
    );
};

export default LoginPage;