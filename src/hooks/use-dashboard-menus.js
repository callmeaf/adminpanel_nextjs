import { useContext, useMemo } from "react";
import { AuthContext } from "@/context/auth/auth-context";
import { useTranslations } from "next-intl";
import routes from "@/routes/routes";

const useDashboardMenus = () => {
  const { user } = useContext(AuthContext);
  const t = useTranslations("Common.DashboardMenu");

  const menus = useMemo(() => routes(t), [user]);

  const getMenu = (menuId, { replaces = {} } = {}) => {
    const menu = menus.find((menu) => menu.id.toString() === menuId.toString());
    for (const [key, value] of Object.entries(replaces)) {
      menu.href = menu.href.replace(`:${key}`, value);
    }
    return menu;
  };

  return {
    menus,
    getMenu,
  };
};

export default useDashboardMenus;
