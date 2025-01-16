import React, {useActionState, useContext} from 'react';
import {Grid2, TextField} from "@mui/material";
import {useTranslations} from "next-intl";
import Button from '@mui/material/Button'
import {actionState} from "@/helpers";
import {UiContext} from "@/context/ui/ui-context";
const LoginForm = ({onSubmit}) => {
    const t = useTranslations('LoginForm');

    const [{
        inputs,
        errors,
    }, submitAction, isPending] = useActionState(onSubmit, actionState({
        mobile: '',
        password: '',
    }))

    return (
        <form  action={submitAction}>
            <Grid2 container spacing={2} >
                <Grid2 size={12}>
                    <TextField id={`mobile`} name={'mobile'} label={t('mobile_label')} fullWidth variant={`standard`}
                               defaultValue={inputs.mobile} error={!!errors?.mobile}
                               helperText={errors?.mobile}/>
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