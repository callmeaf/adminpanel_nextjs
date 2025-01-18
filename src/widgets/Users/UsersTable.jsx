import React, {useEffect, useState} from 'react';
import useApi from "@/hooks/use-api";
import {getUsers} from "@/thunks/user-thunks";
import Table from "@/components/Table/Table";
import UsersItemTable from "@/widgets/Users/UsersItemTable";
import {useTranslations} from "next-intl";
import Pagination from "@/components/Pagination/Pagination";
import Show from "@/components/Show";
import {CircularProgress} from "@mui/material";

const UsersTable = () => {
    const t = useTranslations("UsersTable")

    const [users, setUsers] = useState(null)

    const {handle, loading} = useApi()

    const getUsersHandler = async (payload) => {
        try {
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
            loadingChild={<CircularProgress/>}
            when={users}
            whenChild={() => <>
                <Table heads={[
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
                ]}>
                    {users.data.map(user => <UsersItemTable key={user.id} user={user}/>)}
                </Table>
                <Pagination pagination={users.pagination} onPageChange={getUsersHandler}/>
            </>}
        />
    );
};

export default UsersTable;