import React, {useContext} from 'react';
import Show from "@/components/Show";
import {CircularProgress} from "@mui/material";
import {AuthContext} from "@/context/auth/auth-context";

const UsersTable = () => {
    const {state: authState} = useContext(AuthContext)
    const {user} = authState
    return (
        <div>
            <Show when={!!user}>
                <>
                    {user?.fullName}
                </>
                <>
                    <CircularProgress size={20}/>
                </>
            </Show>
        </div>
    );
};

export default UsersTable;