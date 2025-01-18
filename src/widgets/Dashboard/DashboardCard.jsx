import React, {useContext} from 'react';
import {AuthContext} from "@/context/auth/auth-context";
import {CircularProgress} from "@mui/material";
import Show from "@/components/Show";

const DashboardCard = () => {
    const {state: authState} = useContext(AuthContext)
    const {user} = authState
    return (
        <div>
            <h1>Welcome:
                <Show
                    when={user}
                    whenChild={<>
                        {user?.fullName}
                    </>}
                    elseChild={<>
                        <CircularProgress size={20}/>
                    </>}
                />
            </h1>
        </div>
    );
};

export default DashboardCard;