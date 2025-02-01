import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";
import TableItemStatus from "@/components/Table/Partials/TableItemStatus";
import TableItemType from "@/components/Table/Partials/TableItemType";

const ProductCategoriesItemTable = ({
  productCategory,
  index,
  startFrom,
  onEdit,
  onStatusUpdate,
  onDelete,
}) => {
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
        <TableItemStatus
          productCategoryId={productCategory.id}
          status={productCategory.status}
          onStatusUpdate={onStatusUpdate}
        />
      </TableCell>
      <TableCell>{productCategory.createdAtText}</TableCell>
      <TableCell>
        <TableActions
          onEdit={() => {
            onEdit({
              replaces: {
                product_category_id: productCategory.id,
              },
            });
          }}
          onDelete={() =>
            onDelete({
              product_category_id: productCategory.id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductCategoriesItemTable;
