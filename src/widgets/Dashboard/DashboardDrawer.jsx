import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import { useRouter } from "@/i18n/routing";
import DashboardGroupedMenus from "./DashboardGroupedMenus";
import { UiContext } from "@/context/ui/ui-context";
import { SET_LOADING_PAGE } from "@/context/ui/action-types";

export default function DashboardDrawer() {
  const { menus } = useDashboardMenus();
  const router = useRouter();
  const { dispatch } = React.useContext(UiContext);

  const navigateHandler = (menu) => {
    dispatch({
      type: SET_LOADING_PAGE,
      payload: true,
    });
    router.push(menu.href);
  };

  const groupedMenus = Object.groupBy(menus, ({ group }) => group);
  return (
    <div>
      <Drawer
        open
        hideBackdrop
        anchor={"right"}
        variant={"persistent"}
        PaperProps={{
          sx: {
            position: "relative",
          },
        }}
      >
        <Box sx={{ width: 250, position: "relative" }} role="presentation">
          <List>
            {Object.keys(groupedMenus).map((group) => (
              <DashboardGroupedMenus
                key={group}
                groupedMenus={groupedMenus[group]}
                onNavigate={navigateHandler}
              />
            ))}
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
