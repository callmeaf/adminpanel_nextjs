import PaginateModel from "@/models/PaginateModel";
import PermissionModel from "@/models/PermissionModel";

const PREFIX_URL = "/permissions";

export const getPermissions = (api, payload = {}) => {
  return {
    onSend: async () => {
      return api.get(`${PREFIX_URL}`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.permissions = PaginateModel(
        result.permissions,
        PermissionModel
      );
    },
  };
};
