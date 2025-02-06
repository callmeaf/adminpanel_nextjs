import MediaModel from "./MediaModel";
import ProductCategoryModel from "./ProductCategoryModel";
import ProvinceModel from "./ProvinceModel";
import UserModel from "./UserModel";

export default function ProductModel({
  id,
  author_id,
  province_id,
  status,
  status_text,
  type,
  type_text,
  title,
  slug,
  summary,
  content,
  image,
  created_at_text,
  deleted_at_text,
  author,
  cats_ids,
  cats,
  province,
}) {
  return {
    id: id,
    authorId: author_id,
    provinceId: province_id,
    status: status,
    statusText: status_text,
    statusValue: {
      label: status_text,
      value: status,
    },
    type: type,
    typeText: type_text,
    typeValue: {
      label: type_text,
      value: type,
    },
    typeBadgeConfig: {
      1: "default",
      2: "error",
    },
    title: title,
    slug: slug,
    summary: summary,
    content: content,
    image: image ? MediaModel(image) : null,
    createdAtText: created_at_text,
    deletedAtText: deleted_at_text,
    author: author ? UserModel(author) : null,
    authorValue: function () {
      return {
        label: this.author?.fullName,
        value: this.author?.id,
      };
    },
    province: province ? ProvinceModel(province) : null,
    provinceValue: function () {
      return {
        label: this.province.name,
        value: this.province.id,
      };
    },
    catsIds: cats_ids,
    cats: cats ? cats.data.map((cat) => ProductCategoryModel(cat)) : [],
    catsValues: function () {
      return this.cats.map((cat) => ({
        label: cat.title,
        value: cat.id,
      }));
    },
  };
}
