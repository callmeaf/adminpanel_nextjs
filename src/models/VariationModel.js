import ProductModel from "./ProductModel";
import VariationTypeModel from "./VariationTypeModel";

export default function VariationModel({
  id,
  product_id,
  status,
  status_text,
  sku,
  stock,
  title,
  content,
  price,
  price_text,
  discount_price,
  discount_price_text,
  created_at_text,
  deleted_at_text,
  type,
  product,
  image,
}) {
  return {
    id: id,
    productId: product_id,
    status: status,
    statusText: status_text,
    statusValue: {
      label: status_text,
      value: status,
    },
    sku: sku,
    stock: stock,
    price,
    priceText: price_text,
    discountPrice: discount_price,
    discountPriceText: discount_price_text,
    title,
    content,
    createdAtText: created_at_text,
    deletedAtText: deleted_at_text,
    type: type ? VariationTypeModel(type) : null,
    typeValue: function () {
      return {
        label: this.type?.title,
        value: this.type?.id,
      };
    },
    product: product ? ProductModel(product) : null,
    image: image ? MediaModel(image) : null,
  };
}
