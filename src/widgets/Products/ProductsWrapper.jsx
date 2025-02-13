import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  assignCatsToProduct,
  createProduct,
  getProductById,
  updateImageProduct,
  updateProductById,
} from "@/thunks/product-thunks";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import { typeOf } from "@/helpers";
import ProductsForm from "./ProductsForm";
import { createVariation } from "@/thunks/variation-thunks";
import dataHandler from "@/utils/data-handler";

const ProductsWrapper = ({ productId }) => {
  const { handle, loading } = useApi();

  const createProductHandler = async (prevState, formData) => {
    const data = await handle(createProduct, { payload: formData });
    const { product: productData } = data;

    if (productData) {
      await Promise.all([
        updateImageProductHandler(productData.id, formData),
        createVariationHandler(productData.id, formData),
      ]);
    }

    return data;
  };

  const updateProductHandler = async (prevState, formData) => {
    const data = await handle(updateProductById, {
      payload: formData,
      extra: {
        product_id: productId,
      },
    });
    await Promise.all([updateImageProductHandler(productId, formData)]);

    return data;
  };

  const assignCatsToProductHandler = async (productId, formData) => {
    if (product) {
      const productCats = product.cats.map((cat) => cat.id);
      const { getAll } = dataHandler(formData);
      const formCats = getAll("cats[]", []);

      const { toJson } = jsonArtisan();
      if (toJson(productCats.sort()) === toJson(formCats.sort())) {
        return;
      }
    }

    return await handle(
      assignCatsToProduct,
      {
        payload: formData,
        extra: {
          product_id: productId,
        },
      },
      {
        showSuccessAlert: false,
      }
    );
  };

  const updateImageProductHandler = async (productId, formData) => {
    const { isUploadedFile } = typeOf(formData.get("image"));
    if (isUploadedFile) {
      return await handle(
        updateImageProduct,
        {
          payload: formData,
          extra: {
            product_id: productId,
          },
        },
        {
          showSuccessAlert: false,
          hasFile: true,
        }
      );
    }
  };

  const createVariationHandler = async (productId, formData) => {
    const { getAll } = dataHandler(formData);
    const variations = [];

    const formDataVariationKey = "variations[]";
    const variationsFormDataKeys = [
      "status",
      "variation_type",
      "title",
      "stock",
      "price",
      "discount_price",
      "content",
    ];

    variationsFormDataKeys.forEach((formDataKey) => {
      console.log(`${formDataVariationKey}${formDataKey}`);
      variations.push({
        [formDataKey]: getAll(`${formDataVariationKey}${formDataKey}`),
      });
    });

    const responses = [];
    const variationsLength = variations[0].length;
    for (let i = 0; i < variationsLength; i++) {
      const variationFormData = new FormData();

      variationFormData.append("product_id", productId);
      variations.forEach((key, data) => {
        variationFormData.append(key, data[i]);
      });
      const response = await handle(
        createVariation,
        {
          payload: variationFormData,
        },
        {
          showSuccessAlert: false,
        }
      );
      responses.push(response);
    }

    return responses;
  };

  const [product, setProduct] = useState(null);
  const getProductByIdHandler = async () => {
    if (!productId) {
      return;
    }
    const data = await handle(
      getProductById,
      {
        payload: {
          product_id: productId,
        },
      },
      {
        showSuccessAlert: false,
      }
    );

    setProduct(data.product);
  };

  useEffect(() => {
    getProductByIdHandler();
  }, [productId]);

  return (
    <Show
      loading={loading}
      loadingChild={() => <LinearProgress />}
      when={productId ? product : true}
      whenChild={() => (
        <ProductsForm
          onSubmit={productId ? updateProductHandler : createProductHandler}
          product={product}
        />
      )}
    />
  );
};

export default ProductsWrapper;
