import React, {useActionState} from 'react';
import {Button, CircularProgress, Grid2, TextField, Typography} from "@mui/material";
import {useTranslations} from "next-intl";
const LoginForm = ({onSubmit}) => {
    const t = useTranslations('LoginForm');

    const [state,submitAction,isPending] = useActionState(onSubmit,{
        mobile: '',
        password: '',
    })
    return (
        <form  action={submitAction}>
            <Grid2 container spacing={2} >
                <Grid2 size={12}>
                    <TextField id={`mobile`} name={'mobile'} label={t('mobile_label')} fullWidth variant={`standard`} defaultValue={state.mobile} />
                </Grid2>
                <Grid2 size={12}>
                    <TextField id={`password`} name={'password'} type={'password'} label={t('password_label')} fullWidth variant={`standard`} />
                </Grid2>
                <Grid2>
                    <Button type={'submit'} variant={`contained`}>{t('submit_label')}</Button>
                </Grid2>
                {state.errors && <Typography variant={'body2'} component={'div'}>{state.errors.mobile}</Typography> }
                {isPending && <CircularProgress />}
            </Grid2>

        </form>
    );
};

export default LoginForm;