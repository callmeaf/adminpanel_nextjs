import paginateModel from "@/models/PaginateModel";
import UserModel from "@/models/UserModel";
import dataHandler from "@/utils/data-handler";

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
      formData.append("first_name", get("first_name"));
      formData.append("last_name", get("last_name"));
      formData.append("mobile", get("mobile"));

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
