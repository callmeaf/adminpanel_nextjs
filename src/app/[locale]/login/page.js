'use client'

import React from 'react';
import {Card, CardContent, Box,  Typography} from "@mui/material";
import {useTranslations} from 'next-intl';
import BaseLayout from "@/components/Layout/BaseLayout";
import LoginForm from "@/widgets/Auth/LoginForm";
import useApi from "@/hooks/use-api";

const LoginPage = () => {
    const t = useTranslations('LoginPage');
    const api = useApi();
    const loginHandler = async (prevState,formData) => {
        const mobile = formData.get('mobile')
        const password = formData.get('password');

        try {
            const res = await api.post('/login_via_mobile',{
                mobile,
                password,
            })
            console.log({res})

            return {
                mobile
            }
        } catch (e) {

            return {
                mobile,
            }
        }
    }
    return (
        <BaseLayout>
            <Box  sx={{minHeight: '100vh',display: 'flex',justifyContent: 'center'}}>
                <Card sx={{ maxWidth: '400px',m: 'auto'}}>
                    <CardContent>
                        <Typography variant={`h5`} component={'div'} marginBottom={5} textAlign={'center'}>
                            {t('title')}
                        </Typography>
                        <LoginForm onSubmit={loginHandler} />
                    </CardContent>
                </Card>
            </Box>
        </BaseLayout>
    );
};

export default LoginPage;