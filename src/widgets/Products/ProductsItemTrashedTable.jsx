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
  const restoreHandler = () => {
    onRestore({
      product_id: product.id,
    });
  };

  const forceDeleteHandler = () => {
    onForceDelete({
      product_id: product.id,
    });
  };
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
          onRestore={restoreHandler}
          onForceDelete={forceDeleteHandler}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductsItemTrashedTable;
