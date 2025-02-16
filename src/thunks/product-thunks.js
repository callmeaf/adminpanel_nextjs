import PaginateModel from "@/models/PaginateModel";
import ProductModel from "@/models/ProductModel";
import dataHandler from "@/utils/data-handler";
import { getEnums } from "./base-thunks";
import { exportExcel } from "./excel-thunks";

const PREFIX_URL = "/products";

export const getProducts = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.products = PaginateModel(result.products, ProductModel);
    },
  };
};

export const getProductsTrashed = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/trashed/index`, payload);
    },
    onSuccess: ({ result, finalData }) => {
      finalData.products = PaginateModel(result.products, ProductModel);
    },
  };
};

export const getProductById = (api, payload) => {
  return {
    onSend: async () => {
      return await api.get(`${PREFIX_URL}/${payload.product_id}`);
    },
    onSuccess: async ({ result, finalData }) => {
      finalData.product = ProductModel(result.product);
    },
  };
};

export const createProduct = (api, payload = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("province_id", get("province_id"));
      formData.append("author_id", get("author_id"));
      formData.append("status", get("status"));
      formData.append("type", get("type"));
      formData.append("title", get("title"));
      formData.append("summary", get("summary"));
      formData.append("content", get("content"));
      formData.append("slug", get("slug"));

      return await api.post(`${PREFIX_URL}`, formData);
    },
    onSuccess: ({ result, finalData, router }) => {
      finalData.product = ProductModel(result.product);
      router.push(`${PREFIX_URL}`);
    },
  };
};

export const assignCatsToProduct = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { getAll } = dataHandler(payload);

      const formData = new FormData();
      formData.append("_method", "PATCH");
      getAll("cats[]", []).forEach((cat) => {
        formData.append("cats_ids[]", cat);
      });
      return await api.post(`${PREFIX_URL}/${extra.product_id}/cats`, formData);
    },
  };
};

export const updateProductById = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("province_id", get("province_id"));
      formData.append("author_id", get("author_id"));
      formData.append("status", get("status"));
      formData.append("type", get("type"));
      formData.append("title", get("title"));
      formData.append("summary", get("summary"));
      formData.append("content", get("content"));
      formData.append("slug", get("slug"));

      return await api.post(`${PREFIX_URL}/${extra.product_id}`, formData);
    },
    onSuccess: ({ router }) => {
      router.push(`${PREFIX_URL}`);
    },
  };
};

export const updateProductsStatusById = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("status", get("status"));

      return await api.post(
        `${PREFIX_URL}/${extra.product_id}/status`,
        formData
      );
    },
  };
};

export const deleteProduct = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`${PREFIX_URL}/${payload.product_id}`);
    },
  };
};

export const restoreProduct = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.patch(`${PREFIX_URL}/${payload.product_id}/restore`);
    },
  };
};

export const forceDeleteProduct = (api, payload = {}) => {
  return {
    onSend: async () => {
      return await api.delete(`${PREFIX_URL}/${payload.product_id}/force`);
    },
  };
};

export const getProductEnums = (
  api,
  payload = {
    keys: ["product"],
  }
) => getEnums(api, payload);

export const exportExcelProducts = (api, payload = {}, extra = {}) =>
  exportExcel(api, payload, {
    key: "products",
    ...extra,
  });

export const updateImageProduct = (api, payload = {}, extra = {}) => {
  return {
    onSend: async () => {
      const { get } = dataHandler(payload);

      const formData = new FormData();
      formData.append("_method", "PATCH");
      const image = get("image");
      formData.append("image", image, image.name);

      return await api.post(
        `${PREFIX_URL}/${extra.product_id}/image`,
        formData
      );
    },
  };
};
