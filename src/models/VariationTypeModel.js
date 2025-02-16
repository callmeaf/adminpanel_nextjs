export default function VariationTypeModel({
  id,
  status,
  status_text,
  cat,
  cat_text,
  title,
  content,
  created_at_text,
  deleted_at_text,
}) {
  return {
    id: id,
    status: status,
    statusText: status_text,
    statusValue: {
      label: status_text,
      value: status,
    },
    cat: cat,
    catText: cat_text,
    catValue: {
      label: cat_text,
      value: cat,
    },
    catBadgeConfig: {
      1: "default",
      2: "error",
    },
    title,
    labelText: `${title}`,
    content,
    createdAtText: created_at_text,
    deletedAtText: deleted_at_text,
  };
}
