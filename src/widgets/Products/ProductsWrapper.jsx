import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  createProduct,
  getProductById,
  updateImageProduct,
  updateProductById,
} from "@/thunks/product-thunks";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import { typeOf } from "@/helpers";
import ProductsForm from "./ProductsForm";

const ProductsWrapper = ({ productId }) => {
  const { handle, loading } = useApi();

  const createProductHandler = async (prevState, formData) => {
    const data = await handle(createProduct, { payload: formData });
    const { product: productData } = data;

    if (productData) {
      await Promise.all([updateImageProductHandler(productData.id, formData)]);
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
