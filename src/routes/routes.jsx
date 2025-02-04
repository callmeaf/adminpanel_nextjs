import dashboard_routes from "./dashboard_routes";
import product_categories_routes from "./product_categories_routes";
import products_routes from "./products_routes";
import roles_routes from "./roles_routes";
import users_routes from "./users_routes";

export default (t) => [
  ...dashboard_routes(t),
  ...users_routes(t),
  ...roles_routes(t),
  ...product_categories_routes(t),
  ...products_routes(t),
];
