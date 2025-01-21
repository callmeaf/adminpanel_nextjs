import React from "react";
import DashboardMenuItem from "./DashboardMenuItem";
import { Divider } from "@mui/material";

const DashboardGroupedMenus = ({ groupedMenus, onNavigate }) => {
  return (
    <>
      {groupedMenus
        .filter((groupedMenu) => groupedMenu.showInSideBar !== false)
        .map((groupedMenu) => (
          <DashboardMenuItem
            key={groupedMenu.id}
            menu={groupedMenu}
            onNavigate={onNavigate}
          />
        ))}
      <Divider />
    </>
  );
};

export default DashboardGroupedMenus;
