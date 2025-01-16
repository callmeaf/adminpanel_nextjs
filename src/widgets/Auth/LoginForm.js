import React, {useActionState} from 'react';
import {Grid2, TextField} from "@mui/material";
import {useTranslations} from "next-intl";
import Button from '@mui/material/Button'
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
                    <TextField id={`mobile`} name={'mobile'} label={t('mobile_label')} fullWidth variant={`standard`}
                               defaultValue={state.mobile} error={!!state.errors?.mobile}
                               helperText={state.errors?.mobile}/>
                </Grid2>
                <Grid2 size={12}>
                    <TextField id={`password`} name={'password'} type={'password'} label={t('password_label')} fullWidth variant={`standard`} />
                </Grid2>
                <Grid2>
                    <Button type={'submit'} variant={`outlined`} loading={isPending}>
                        {t('submit_label')}
                    </Button>
                </Grid2>
            </Grid2>

        </form>
    );
};

export default LoginForm;