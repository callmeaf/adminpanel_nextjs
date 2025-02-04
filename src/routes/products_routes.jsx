import {
  Dashboard as DashboardIcon,
  DashboardCustomize as DashboardCustomizeIcon,
  DeveloperBoard as DeveloperBoardIcon,
} from "@mui/icons-material";

const GROUP = "products";

export default (t) => [
  {
    id: "products",
    href: "/products",
    label: t("products_label"),
    icon: <DashboardIcon />,
    group: GROUP,
  },
  {
    id: "products_create",
    href: "/products/create",
    label: t("products_create_label"),
    icon: <DashboardCustomizeIcon />,
    group: GROUP,
  },
  {
    id: "products_edit",
    href: "/products/:product_id/edit",
    showInSideBar: false,
    group: GROUP,
  },
  {
    id: "products_trashed",
    href: "/products/trashed",
    label: t("products_trashed_label"),
    icon: <DeveloperBoardIcon />,
    group: GROUP,
  },
];
