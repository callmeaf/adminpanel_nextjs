import dataHandler from "@/utils/data-handler";
import { getEnums } from "./base-thunks";
import VariationModel from "@/models/VariationModel";

const PREFIX_URL = "/variations";

export const getVariationEnums = (
  api,
  payload = {
    keys: ["variation"],
  }
) => getEnums(api, payload);

export const createVariation = (api, payload = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("product_id", get("product_id"));
      formData.append("status", get("status"));
      formData.append("variation_type_id", get("variation_type"));
      formData.append("title", get("title"));
      formData.append("stock", get("stock"));
      formData.append("price", get("price"));
      formData.append("discount_price", get("discount_price"));
      formData.append("content", get("content"));

      return await api.post(`${PREFIX_URL}`, formData);
    },
    onSuccess: ({ result, finalData, router }) => {
      finalData.variation = VariationModel(result.variation);
    },
  };
};

export const updateVariationById = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("product_id", get("product_id"));
      formData.append("status", get("status"));
      formData.append("variation_type_id", get("variation_type"));
      formData.append("title", get("title"));
      formData.append("stock", get("stock"));
      formData.append("price", get("price"));
      formData.append("discount_price", get("discount_price"));
      formData.append("content", get("content"));

      return await api.post(`${PREFIX_URL}/${extra.variation_id}`, formData);
    },
    onSuccess: ({ result, finalData, router }) => {
      finalData.variation = VariationModel(result.variation);
    },
  };
};

export const updateImageVariation = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);

      const formData = new FormData();
      formData.append("_method", "PATCH");
      const image = get("image");
      formData.append("image", image, image.name);

      return await api.post(
        `${PREFIX_URL}/${extra.variation_id}/image`,
        formData
      );
    },
  };
};

export const deleteVariation = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`${PREFIX_URL}/${payload.variation_id}`);
    },
  };
};
