import React, { useEffect, useState } from "react";
import ProductCategoriesForm from "./ProductCategoriesForm";
import useApi from "@/hooks/use-api";
import {
  createProductCategory,
  getProductCategoryById,
  updateImageProductCategory,
  updateProductCategoryById,
} from "@/thunks/product-category-thunks";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import { typeOf } from "@/helpers";

const ProductCategoriesWrapper = ({ productCategoryId }) => {
  const { handle, loading } = useApi();

  const createProductCategoryHandler = async (prevState, formData) => {
    const data = await handle(createProductCategory, { payload: formData });
    const { productCategory: productCategoryData } = data;

    if (productCategoryData) {
      await Promise.all([
        updateImageProductCategoryHandler(productCategoryData.id, formData),
      ]);
    }

    return data;
  };

  const updateProductCategoryHandler = async (prevState, formData) => {
    const data = await handle(updateProductCategoryById, {
      payload: formData,
      extra: {
        ProductCategory_id: productCategoryId,
      },
    });
    await Promise.all([
      updateImageProductCategoryHandler(productCategoryId, formData),
    ]);

    return data;
  };

  const updateImageProductCategoryHandler = async (
    productCategoryId,
    formData
  ) => {
    const { isUploadedFile } = typeOf(formData.get("image"));
    if (isUploadedFile) {
      return await handle(
        updateImageProductCategory,
        {
          payload: formData,
          extra: {
            ProductCategory_id: productCategoryId,
          },
        },
        {
          showSuccessAlert: false,
          hasFile: true,
        }
      );
    }
  };

  const [productCategory, setProductCategory] = useState(null);
  const getProductCategoryByIdHandler = async () => {
    if (!productCategoryId) {
      return;
    }
    const data = await handle(
      getProductCategoryById,
      {
        payload: {
          ProductCategory_id: productCategoryId,
        },
      },
      {
        showSuccessAlert: false,
      }
    );

    setProductCategory(data.productCategory);
  };

  useEffect(() => {
    getProductCategoryByIdHandler();
  }, [productCategoryId]);

  return (
    <Show
      loading={loading}
      loadingChild={() => <LinearProgress />}
      when={productCategoryId ? productCategory : true}
      whenChild={() => (
        <ProductCategoriesForm
          onSubmit={
            productCategoryId
              ? updateProductCategoryHandler
              : createProductCategoryHandler
          }
          productCategory={productCategory}
        />
      )}
    />
  );
};

export default ProductCategoriesWrapper;
