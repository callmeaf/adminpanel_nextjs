import EnumModel from "@/models/EnumModel";

export const getEnums = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`/enums?key=${payload.keys.join(",")}`);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.enums = EnumModel(result);
    },
  };
};
