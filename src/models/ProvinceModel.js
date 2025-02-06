export default function ProvinceModel({
  id,
  parent_id,
  status,
  status_text,
  type,
  type_text,
  code,
  name,
  slug,
  created_at_text,
  deleted_at_text,
  parent,
}) {
  return {
    id: id,
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
    code,
    name,
    parentId: parent_id,
    slug,
    parent: parent ? ProvinceModel(parent) : null,
    parentValue: function () {
      return {
        label: this.parent?.name,
        value: this.parent?.id,
      };
    },
    createdAtText: created_at_text,
    deletedAtText: deleted_at_text,
  };
}
