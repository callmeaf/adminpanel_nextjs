import PermissionModel from "./PermissionModel";

export default ({
  id,
  name,
  name_fa,
  full_name,
  permissions,
  created_at_text,
  deleted_at_text,
}) => ({
  id: id,
  name: name,
  nameFa: name_fa,
  fullName: full_name,
  labelText: `${full_name}`,
  permissions: permissions
    ? permissions.data.map((permission) => PermissionModel(permission))
    : [],
  permissionsValues: function () {
    return this.permissions.map((permission) => ({
      label: permission.labelText,
      value: permission.id,
    }));
  },
  createdAtText: created_at_text,
  deletedAtText: deleted_at_text,
});
