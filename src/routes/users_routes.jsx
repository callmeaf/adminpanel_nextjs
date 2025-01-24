import {
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  PersonOff as PersonOffIcon,
} from "@mui/icons-material";

const GROUP = "users";

export default (t) => [
  {
    id: "users",
    href: "/users",
    label: t("users_label"),
    icon: <PeopleIcon />,
    group: GROUP,
  },
  {
    id: "users_create",
    href: "/users/create",
    label: t("users_create_label"),
    icon: <PersonAddIcon />,
    group: GROUP,
  },
  {
    id: "users_edit",
    href: "/users/:user_id/edit",
    showInSideBar: false,
    group: GROUP,
  },
  {
    id: "users_trashed",
    href: "/users/trashed",
    label: t("users_trashed_label"),
    icon: <PersonOffIcon />,
    group: GROUP,
  },
];
