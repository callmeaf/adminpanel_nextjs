import { Dashboard as DashboardIcon } from "@mui/icons-material";

const GROUP = "dashboard";

export default (t) => [
  {
    id: "dashboard",
    href: "/dashboard",
    label: t("dashboard_label"),
    icon: <DashboardIcon />,
    group: GROUP,
  },
];
