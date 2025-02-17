import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  assignCatsToProduct,
  createProduct,
  getProductById,
  updateImageProduct,
  updateImagesProduct,
  updateProductById,
} from "@/thunks/product-thunks";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import { jsonArtisan, typeOf } from "@/helpers";
import ProductsForm from "./ProductsForm";
import {
  createVariation,
  updateImageVariation,
  updateVariationById,
} from "@/thunks/variation-thunks";
import dataHandler from "@/utils/data-handler";

const ProductsWrapper = ({ productId }) => {
  const { handle, loading } = useApi();

  const createProductHandler = async (prevState, formData) => {
    const data = await handle(createProduct, { payload: formData });
    const { product: productData } = data;

    if (productData) {
      const { id } = productData;
      await Promise.all([
        assignCatsToProductHandler(id, formData),
        updateImageProductHandler(id, formData),
        updateImagesProductHandler(id, formData),
        updateOrCreateVariationsHandler(id, formData),
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
    await Promise.all([
      assignCatsToProductHandler(productId, formData),
      updateImageProductHandler(productId, formData),
      updateImagesProductHandler(productId, formData),
      updateOrCreateVariationsHandler(productId, formData),
    ]);

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

  const updateImagesProductHandler = async (productId, formData) => {
    const images = formData.getAll("images[]").filter((image) => {
      const { isUploadedFile } = typeOf(image);

      return isUploadedFile;
    });

    if (images.length) {
      return await handle(
        updateImagesProduct,
        {
          payload: {
            "images[]": images,
          },
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

  const updateOrCreateVariationsHandler = async (productId, formData) => {
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
      "image",
      "id",
    ];

    const variationsLength = getAll(
      `${formDataVariationKey}${variationsFormDataKeys[0]}`
    ).length;

    for (let i = 0; i < variationsLength; i++) {
      const variation = {};
      for (const key of variationsFormDataKeys) {
        variation[key] = getAll(`${formDataVariationKey}${key}`)[i];
      }
      variations.push({
        ...variation,
        product_id: productId,
      });
    }

    const responses = [];
    for (const variation of variations) {
      const response = await handle(
        variation.id ? updateVariationById : createVariation,
        {
          payload: variation,
          extra: {
            variation_id: variation?.id,
          },
        },
        {
          showSuccessAlert: false,
        }
      );

      const { isUploadedFile } = typeOf(variation.image);
      if (isUploadedFile) {
        await handle(
          updateImageVariation,
          {
            payload: variation,
            extra: {
              variation_id: response.variation.id,
            },
          },
          {
            hasFile: true,
            showSuccessAlert: false,
          }
        );
      }

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
