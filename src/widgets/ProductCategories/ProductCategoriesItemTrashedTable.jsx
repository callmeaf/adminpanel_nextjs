import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";
import TableItemStatus from "@/components/Table/Partials/TableItemStatus";
import TableItemType from "@/components/Table/Partials/TableItemType";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import { Link } from "@/i18n/routing";

const ProductCategoriesItemTrashedTable = ({
  productCategory,
  index,
  startFrom,
  onRestore,
  onForceDelete,
}) => {
  const { getMenu } = useDashboardMenus();

  const restoreHanlder = () => {
    onRestore({
      product_category_id: productCategory.id,
    });
  };

  const forceDeleteHandler = () => {
    onForceDelete({
      product_category_id: productCategory.id,
    });
  };

  return (
    <TableRow>
      <TableCell>{startFrom + index}</TableCell>
      <TableCell>
        {productCategory.title}
        <TableItemType
          type={productCategory.type}
          typeText={productCategory.typeText}
          typeConfig={productCategory.typeBadgeConfig}
        />
      </TableCell>
      <TableCell>
        {productCategory.parent && (
          <Link
            href={
              getMenu("product_categories_edit", {
                replaces: {
                  product_category_id: productCategory.parent.id,
                },
              }).href
            }
          >
            {productCategory.parent.title}
          </Link>
        )}
      </TableCell>
      <TableCell>
        <TableItemStatus
          productCategoryId={productCategory.id}
          status={productCategory.status}
        />
      </TableCell>
      <TableCell>{productCategory.deletedAtText}</TableCell>
      <TableCell>
        <TableActions
          onRestore={restoreHanlder}
          onForceDelete={forceDeleteHandler}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductCategoriesItemTrashedTable;
