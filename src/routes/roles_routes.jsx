import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  AddModerator as AddModeratorIcon,
} from "@mui/icons-material";

const GROUP = "roles";

export default (t) => [
  {
    id: "roles",
    href: "/roles",
    label: t("roles_label"),
    icon: <AdminPanelSettingsIcon />,
    group: GROUP,
  },
  {
    id: "roles_create",
    href: "/roles/create",
    label: t("roles_create_label"),
    icon: <AddModeratorIcon />,
    group: GROUP,
  },
  {
    id: "roles_edit",
    href: "/roles/:user_id/edit",
    showInSideBar: false,
    group: GROUP,
  },
];
