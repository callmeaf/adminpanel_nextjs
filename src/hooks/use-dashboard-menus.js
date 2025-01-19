import React, { useContext, useMemo } from "react";
import { AuthContext } from "@/context/auth/auth-context";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import { useTranslations } from "next-intl";

const useDashboardMenus = () => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("Common.DashboardMenu");

  const menus = useMemo(
    () => [
      {
        id: "dashboard",
        href: "/dashboard",
        label: t("dashboard_label"),
        icon: <DashboardIcon />,
      },
      {
        id: "users",
        href: "/users",
        label: t("users_label"),
        icon: <PeopleIcon />,
      },
    ],
    [user]
  );

  return {
    menus,
  };
};

export default useDashboardMenus;
