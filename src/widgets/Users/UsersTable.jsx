import React, {useEffect, useState} from 'react';
import useApi from "@/hooks/use-api";
import {getUsers} from "@/thunks/user-thunks";
import Table from "@/components/Table/Table";
import UsersItemTable from "@/widgets/Users/UsersItemTable";
import {useTranslations} from "next-intl";
import Pagination from "@/components/Pagination/Pagination";
import Show from "@/components/Show";
import {Backdrop, CircularProgress, Grid2, InputAdornment, LinearProgress, Skeleton, TextField} from "@mui/material";
import {Search as SearchIcon} from "@mui/icons-material";

const UsersTable = () => {
    const t = useTranslations("UsersTable")

    const [users, setUsers] = useState(null)

    const {handle, loading} = useApi()

    const getUsersHandler = async (payload) => {
        try {
            console.log({payload})
            const res = await handle(getUsers, {payload})
            setUsers(res.users)
        } catch (e) {
            throw e
        }
    }

    useEffect(() => {
        getUsersHandler().catch(e => console.error({e}))
    }, []);

    return (
        <Show
            loading={loading}
            loadingChild={<LinearProgress key={'loading'} hidden={!loading}/>}
            loadingChildWithWhenChild
            when={users}
            whenChild={() => <>
                <Table key={'table'} t={t} loading={loading} heads={[
                    {
                        id: 'id',
                        label: t('id_label'),
                    },
                    {
                        id: 'full_name',
                        label: t('full_name_label'),
                    },
                    {
                        id: 'email',
                        label: t('email_label')
                    },
                    {
                        id: 'mobile',
                        label: t('mobile_label')
                    },
                    {
                        id: 'created_at',
                        label: t('created_at_label')
                    },
                ]} pagination={users.pagination} onPageChange={getUsersHandler} onSearch={getUsersHandler}
                       searchParams={[
                           'mobile',
                           'email',
                           'first_name',
                           'last_name'
                ]}>
                    {users.data.map(user => <UsersItemTable key={user.id} user={user}/>)}
                </Table>
            </>}
        />
    );
};

export default UsersTable;