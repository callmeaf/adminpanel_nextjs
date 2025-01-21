import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";

const DashboardMenuItem = ({ menu, onNavigate }) => {
  return (
    <ListItem key={menu.id} disablePadding>
      <ListItemButton onClick={() => onNavigate(menu)}>
        <ListItemIcon>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.label} />
      </ListItemButton>
    </ListItem>
  );
};

export default DashboardMenuItem;
