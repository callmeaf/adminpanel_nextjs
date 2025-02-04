import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";
import TableItemStatus from "@/components/Table/Partials/TableItemStatus";
import TableItemType from "@/components/Table/Partials/TableItemType";
import { Link } from "@/i18n/routing";
import useDashboardMenus from "@/hooks/use-dashboard-menus";

const ProductsItemTable = ({
  product,
  index,
  startFrom,
  onEdit,
  onStatusUpdate,
  onDelete,
}) => {
  const { getMenu } = useDashboardMenus();

  return (
    <TableRow>
      <TableCell>{startFrom + index}</TableCell>
      <TableCell>
        {product.title}
        <TableItemType
          type={product.type}
          typeText={product.typeText}
          typeConfig={product.typeBadgeConfig}
        />
      </TableCell>
      <TableCell>
        {product.parent && (
          <Link
            href={
              getMenu("products_edit", {
                replaces: {
                  product_id: product.parent.id,
                },
              }).href
            }
          >
            {product.parent.title}
          </Link>
        )}
      </TableCell>
      <TableCell>
        <TableItemStatus
          itemId={product.id}
          status={product.status}
          onStatusUpdate={onStatusUpdate}
          statusConfig={{
            1: "success",
            2: "error",
          }}
        />
      </TableCell>
      <TableCell>{product.createdAtText}</TableCell>
      <TableCell>
        <TableActions
          onEdit={() => {
            onEdit({
              replaces: {
                product_id: product.id,
              },
            });
          }}
          onDelete={() =>
            onDelete({
              product_id: product.id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductsItemTable;
