import MediaModel from "./MediaModel";
import RoleModel from "./RoleModel";

export default ({
  id,
  status,
  status_text,
  type,
  type_text,
  first_name,
  last_name,
  full_name,
  email,
  mobile,
  national_code,
  image,
  roles_ids,
  roles,
  created_at_text,
  deleted_at_text,
}) => ({
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
  firstName: first_name,
  lastName: last_name,
  fullName: full_name,
  email: email,
  mobile: mobile,
  nationalCode: national_code,
  image: image ? MediaModel(image) : null,
  rolesIds: roles_ids ?? [],
  roles: roles ? roles.data.map((role) => RoleModel(role)) : [],
  rolesValues: function () {
    return this.roles.map((role) => ({
      label: role.fullName,
      value: role.id,
    }));
  },
  createdAtText: created_at_text,
  deletedAtText: deleted_at_text,
});
