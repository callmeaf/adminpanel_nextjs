import PaginateModel from "@/models/PaginateModel";
import UserModel from "@/models/UserModel";
import dataHandler from "@/utils/data-handler";
import { getEnums } from "./base-thunks";
import { exportExcel } from "./excel-thunks";

const PREFIX_URL = "/users";

export const getUsers = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.users = PaginateModel(result.users, UserModel);
    },
  };
};

export const getUsersTrashed = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/trashed/index`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.users = PaginateModel(result.users, UserModel);
    },
  };
};

export const getUserById = (api, payload) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/${payload.user_id}`);
    },
    onSuccess: async ({ result, finalData }) => {
      finalData.user = UserModel(result.user);
    },
  };
};

export const createUser = (api, payload = {}) => {
  return {
    onSend: async () => {
      const { get, getAll } = dataHandler(payload);
      const formData = new FormData();
      formData.append("status", get("status"));
      formData.append("type", get("type"));
      getAll("roles[]", []).forEach((role) => {
        formData.append("roles[]", role);
      });
      formData.append("first_name", get("first_name"));
      formData.append("last_name", get("last_name"));
      formData.append("mobile", get("mobile"));
      formData.append("email", get("email"));
      formData.append("national_code", get("national_code"));

      return await api.post(`${PREFIX_URL}`, formData);
    },
    onSuccess: ({ result, router }) => {
      router.push(`${PREFIX_URL}`);
    },
  };
};

export const updateUserById = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("status", get("status"));
      formData.append("type", get("type"));
      formData.append("first_name", get("first_name"));
      formData.append("last_name", get("last_name"));
      formData.append("mobile", get("mobile"));
      formData.append("email", get("email"));
      formData.append("national_code", get("national_code"));

      return await api.post(`${PREFIX_URL}/${extra.user_id}`, formData);
    },
    onSuccess: ({ router }) => {
      router.push(`${PREFIX_URL}`);
    },
  };
};

export const updateUserStatusById = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("status", get("status"));

      return await api.post(`${PREFIX_URL}/${extra.user_id}/status`, formData);
    },
  };
};

export const deleteUser = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`${PREFIX_URL}/${payload.user_id}`);
    },
  };
};

export const restoreUser = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.patch(`${PREFIX_URL}/${payload.user_id}/restore`);
    },
  };
};

export const forceDeleteUser = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`${PREFIX_URL}/${payload.user_id}/force`);
    },
  };
};

export const getUserEnums = (
  api,
  payload = {
    keys: ["user", "cart"],
  }
) => getEnums(api, payload);

export const exportExcelUsers = (api, payload = {}, extra = {}) =>
  exportExcel(api, payload, extra);
