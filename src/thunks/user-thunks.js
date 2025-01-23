import paginateModel from "@/models/PaginateModel";
import UserModel from "@/models/UserModel";
import dataHandler from "@/utils/data-handler";
import { getEnums } from "./base-thunks";

const PREFIX_URL = "/users";

export const getUsers = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.users = paginateModel(result.users, UserModel);
    },
  };
};

export const getUsersTrashed = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/trashed/index`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.users = paginateModel(result.users, UserModel);
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
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("status", get("status"));
      formData.append("type", get("type"));
      formData.append("first_name", get("first_name"));
      formData.append("last_name", get("last_name"));
      formData.append("mobile", get("mobile"));
      formData.append("email", get("email"));
      formData.append("national_code", get("national_code"));

      return await api.post(`${PREFIX_URL}`, formData);
    },
    onSuccess: ({ result, router }) => {
      router.push(`${PREFIX_URL}/${result.user.id}/edit`);
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

      return await api.post(`${PREFIX_URL}/${extra.userId}`, formData);
    },
    onSuccess: ({ router }) => {
      router.push(`${PREFIX_URL}`);
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

export const getUserEnums = (
  api,
  payload = {
    keys: ["user", "cart"],
  }
) => getEnums(api, payload);
