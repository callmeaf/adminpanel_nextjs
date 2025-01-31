import PaginateModel from "@/models/PaginateModel";
import RoleModel from "@/models/RoleModel";
import dataHandler from "@/utils/data-handler";
import { exportExcel } from "./excel-thunks";

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

export const getRoleById = (api, payload) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/${payload.role_id}`);
    },
    onSuccess: async ({ result, finalData }) => {
      finalData.Role = RoleModel(result.Role);
    },
  };
};

export const createRole = (api, payload = {}) => {
  return {
    onSend: async () => {
      const { get, getAll } = dataHandler(payload);
      const formData = new FormData();
      formData.append("name", get("name"));
      formData.append("name_fa", get("name_fa"));
      getAll("permissions[]", []).forEach((permission) => {
        formData.append("permissions_ids[]", permission);
      });

      return await api.post(`${PREFIX_URL}`, formData);
    },
    onSuccess: ({ result, finalData, router }) => {
      finalData.Role = RoleModel(result.Role);
      router.push(`${PREFIX_URL}`);
    },
  };
};

export const updateRoleById = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("name", get("name"));
      formData.append("name_fa", get("name_fa"));
      getAll("permissions[]", []).forEach((permission) => {
        formData.append("permissions_ids[]", permission);
      });

      return await api.post(`${PREFIX_URL}/${extra.role_id}`, formData);
    },
    onSuccess: ({ router }) => {
      router.push(`${PREFIX_URL}`);
    },
  };
};

export const updateRoleStatusById = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("status", get("status"));

      return await api.post(`${PREFIX_URL}/${extra.role_id}/status`, formData);
    },
  };
};

export const deleteRole = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`${PREFIX_URL}/${payload.role_id}`);
    },
  };
};

export const exportExcelRoles = (api, payload = {}, extra = {}) =>
  exportExcel(api, payload, {
    key: "roles",
    ...extra,
  });
