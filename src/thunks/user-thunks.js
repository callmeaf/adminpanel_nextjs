import paginateModel from "@/models/PaginateModel";
import UserModel from "@/models/UserModel";
import dataHandler from "@/utils/data-handler";
import { getEnums } from "./base-thunks";

export const getUsers = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get("/users", payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.users = paginateModel(result.users, UserModel);
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

      return await api.post("/users", formData);
    },
    onSuccess: ({ result, finalData, router }) => {
      router.push(`/users/${result.user.id}/edit`);
    },
  };
};

export const deleteUser = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`/users/${payload.userId}`);
    },
  };
};

export const getUserEnums = (
  api,
  payload = {
    keys: ["user", "cart"],
  }
) => getEnums(api, payload);
