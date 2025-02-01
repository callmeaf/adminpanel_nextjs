import MediaModel from "./MediaModel";

export default ({
  id,
  parent_id,
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
}) => ({
  id: id,
  parentId: parent_id,
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
});
