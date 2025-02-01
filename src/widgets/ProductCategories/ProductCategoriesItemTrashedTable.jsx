import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";
import TableItemStatus from "@/components/Table/Partials/TableItemStatus";
import TableItemType from "@/components/Table/Partials/TableItemType";

const ProductCategoriesItemTrashedTable = ({
  productCategory,
  index,
  startFrom,
  onRestore,
  onForceDelete,
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
        />
      </TableCell>
      <TableCell>{productCategory.deletedAtText}</TableCell>
      <TableCell>
        <TableActions
          onRestore={() => {
            onRestore({
              productCategory_id: productCategory.id,
            });
          }}
          onForceDelete={() =>
            onForceDelete({
              productCategory_id: productCategory.id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductCategoriesItemTrashedTable;
