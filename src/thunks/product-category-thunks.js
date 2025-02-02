import PaginateModel from "@/models/PaginateModel";
import ProductCategoryModel from "@/models/ProductCategoryModel";
import dataHandler from "@/utils/data-handler";
import { getEnums } from "./base-thunks";
import { exportExcel } from "./excel-thunks";

const PREFIX_URL = "/product_categories";

export const getProductCategories = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.product_categories = PaginateModel(
        result.product_categories,
        ProductCategoryModel
      );
    },
  };
};

export const getProductCategoriesTrashed = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/trashed/index`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.product_categories = PaginateModel(
        result.product_categories,
        ProductCategoryModel
      );
    },
  };
};

export const getProductCategoryById = (api, payload) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/${payload.product_category_id}`);
    },
    onSuccess: async ({ result, finalData }) => {
      finalData.product_category = ProductCategoryModel(
        result.product_category
      );
    },
  };
};

export const createProductCategory = (api, payload = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("parent_id", get("parent_id"));
      formData.append("status", get("status"));
      formData.append("type", get("type"));
      formData.append("title", get("title"));
      formData.append("summary", get("summary"));
      formData.append("content", get("content"));
      formData.append("slug", get("slug"));

      return await api.post(`${PREFIX_URL}`, formData);
    },
    onSuccess: ({ result, finalData, router }) => {
      finalData.product_category = ProductCategoryModel(
        result.product_category
      );
      router.push(`${PREFIX_URL}`);
    },
  };
};

export const updateProductCategoryById = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("parent_id", get("parent_id"));
      formData.append("status", get("status"));
      formData.append("type", get("type"));
      formData.append("title", get("title"));
      formData.append("summary", get("summary"));
      formData.append("content", get("content"));
      formData.append("slug", get("slug"));

      return await api.post(
        `${PREFIX_URL}/${extra.product_category_id}`,
        formData
      );
    },
    onSuccess: ({ router }) => {
      router.push(`${PREFIX_URL}`);
    },
  };
};

export const updateProductCategoriesStatusById = (
  api,
  payload = {},
  extra = {}
) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("status", get("status"));

      return await api.post(
        `${PREFIX_URL}/${extra.product_category_id}/status`,
        formData
      );
    },
  };
};

export const deleteProductCategory = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`${PREFIX_URL}/${payload.product_category_id}`);
    },
  };
};

export const restoreProductCategory = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.patch(
        `${PREFIX_URL}/${payload.product_category_id}/restore`
      );
    },
  };
};

export const forceDeleteProductCategory = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(
        `${PREFIX_URL}/${payload.product_category_id}/force`
      );
    },
  };
};

export const getProductCategoryEnums = (
  api,
  payload = {
    keys: ["product_category"],
  }
) => getEnums(api, payload);

export const exportExcelProductCategories = (api, payload = {}, extra = {}) =>
  exportExcel(api, payload, {
    key: "product_category",
    ...extra,
  });

export const updateImageProductCategory = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);

      const formData = new FormData();
      formData.append("_method", "PATCH");
      const image = get("image");
      formData.append("image", image, image.name);

      return await api.post(
        `${PREFIX_URL}/${extra.product_category_id}/image`,
        formData
      );
    },
  };
};
