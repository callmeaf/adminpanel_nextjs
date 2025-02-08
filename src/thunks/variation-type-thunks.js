import PaginateModel from "@/models/PaginateModel";
import VariationTypeModel from "@/models/VariationTypeModel";

const PREFIX_URL = "/variation_types";

export const getVariationTypes = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.variation_types = PaginateModel(
        result.variation_types,
        VariationTypeModel
      );
    },
  };
};
