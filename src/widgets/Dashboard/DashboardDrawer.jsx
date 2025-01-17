import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import {useRouter} from "@/i18n/routing";
import DashboardMenuItem from "@/widgets/Dashboard/DashboardMenuItem";

export default function DashboardDrawer() {
    const {menus} = useDashboardMenus()
    const router = useRouter()

    const navigateHandler = (menu) => router.push(menu.href)

    return (
        <div>
            <Drawer open hideBackdrop anchor={'right'} variant={'persistent'} PaperProps={{
                sx: {
                    position: 'relative'
                }
            }}>
                <Box sx={{width: 250, position: 'relative'}} role="presentation">
                    <List>
                        {menus.map((menu) => <DashboardMenuItem key={menu.id} menu={menu}
                                                                onNavigate={navigateHandler}/>)}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}