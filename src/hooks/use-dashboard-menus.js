import React, {useContext} from 'react';
import {AuthContext} from "@/context/auth/auth-context";
import {Dashboard as DashboardIcon, People as PeopleIcon} from '@mui/icons-material';

const menus = [
    {
        id: 'dashboard',
        href: '/dashboard',
        label: 'Dashboard',
        icon: <DashboardIcon/>,
    },
    {
        id: 'users',
        href: '/users',
        label: 'Users',
        icon: <PeopleIcon/>
    }
]

const useDashboardMenus = () => {
    const {user} = useContext(AuthContext)

    return {
        menus,
    }
};

export default useDashboardMenus;