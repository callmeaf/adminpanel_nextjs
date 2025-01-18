import React, {useEffect, useState} from 'react';
import useApi from "@/hooks/use-api";
import {getUsers} from "@/thunks/user-thunks";
import Table from "@/components/Table/Table";
import UsersItemTable from "@/widgets/Users/UsersItemTable";
import {useTranslations} from "next-intl";

const UsersTable = () => {
    const t = useTranslations("UsersTable")

    const [users, setUsers] = useState(null)

    const {handle} = useApi()


    useEffect(() => {
        handle(getUsers).then(res => setUsers(res.users))
    }, []);

    if (!users) {
        return
    }

    return (
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
        ]}>
            {users.data.map(user => <UsersItemTable key={user.id} user={user}/>)}
        </Table>
    );
};

export default UsersTable;