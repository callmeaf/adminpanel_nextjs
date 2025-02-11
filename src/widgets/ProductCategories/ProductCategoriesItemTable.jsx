import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";
import TableItemStatus from "@/components/Table/Partials/TableItemStatus";
import TableItemType from "@/components/Table/Partials/TableItemType";
import { Link } from "@/i18n/routing";
import useDashboardMenus from "@/hooks/use-dashboard-menus";

const ProductCategoriesItemTable = ({
  productCategory,
  index,
  startFrom,
  onEdit,
  onStatusUpdate,
  onDelete,
}) => {
  const { getMenu } = useDashboardMenus();

  const productCategoryMenuEditUrl = getMenu("product_categories_edit", {
    replaces: {
      product_category_id: productCategory?.parent?.id,
    },
  })?.href;

  const editHandler = () => {
    onEdit({
      replaces: {
        product_category_id: productCategory.id,
      },
    });
  };

  const deleteHandler = () => {
    onDelete({
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
          <Link href={productCategoryMenuEditUrl}>
            {productCategory.parent.title}
          </Link>
        )}
      </TableCell>
      <TableCell>
        <TableItemStatus
          itemId={productCategory.id}
          status={productCategory.status}
          onStatusUpdate={onStatusUpdate}
          statusConfig={{
            1: "success",
            2: "error",
          }}
        />
      </TableCell>
      <TableCell>{productCategory.createdAtText}</TableCell>
      <TableCell>
        <TableActions onEdit={editHandler} onDelete={deleteHandler} />
      </TableCell>
    </TableRow>
  );
};

export default ProductCategoriesItemTable;
