import PaginateModel from "@/models/PaginateModel";
import ProvinceModel from "@/models/ProvinceModel";

const PREFIX_URL = "/provinces";

export const getProvinces = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.provinces = PaginateModel(result.provinces, ProvinceModel);
    },
  };
};
