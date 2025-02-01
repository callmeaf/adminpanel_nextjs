import {
  AccountTree as AccountTreeIcon,
  Streetview as StreetviewIcon,
  CreateNewFolder as CreateNewFolderIcon,
} from "@mui/icons-material";
const GROUP = "product_categories";

export default (t) => [
  {
    id: "product_categories",
    href: "/product_categories",
    label: t("product_categories_label"),
    icon: <AccountTreeIcon />,
    group: GROUP,
  },
  {
    id: "product_categories_create",
    href: "/product_categories/create",
    label: t("product_categories_create_label"),
    icon: <CreateNewFolderIcon />,
    group: GROUP,
  },
  {
    id: "product_categories_edit",
    href: "/product_categories/:product_category/edit",
    showInSideBar: false,
    group: GROUP,
  },
  {
    id: "product_categories_trashed",
    href: "/product_categories/trashed",
    label: t("product_categories_trashed_label"),
    icon: <StreetviewIcon />,
    group: GROUP,
  },
];
