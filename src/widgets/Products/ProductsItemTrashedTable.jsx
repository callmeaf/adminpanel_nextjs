import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableActions from "@/components/Table/TableItemActions";
import TableItemStatus from "@/components/Table/Partials/TableItemStatus";
import TableItemType from "@/components/Table/Partials/TableItemType";

const ProductsItemTrashedTable = ({
  product,
  index,
  startFrom,
  onRestore,
  onForceDelete,
}) => {
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
        <TableItemStatus productId={product.id} status={product.status} />
      </TableCell>
      <TableCell>{product.deletedAtText}</TableCell>
      <TableCell>
        <TableActions
          onRestore={() => {
            onRestore({
              product_id: product.id,
            });
          }}
          onForceDelete={() =>
            onForceDelete({
              product_id: product.id,
            })
          }
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductsItemTrashedTable;
