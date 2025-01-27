import PaginateModel from "@/models/PaginateModel";
import RoleModel from "@/models/RoleModel";

const PREFIX_URL = "/roles";

export const getRoles = (api, payload = {}) => {
  return {
    onSend: async () => {
      return api.get(`${PREFIX_URL}`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.roles = PaginateModel(result.roles, RoleModel);
    },
  };
};
