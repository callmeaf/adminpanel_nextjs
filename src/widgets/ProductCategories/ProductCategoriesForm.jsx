import Form from "@/components/Form/Form";
import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormFile from "@/components/Form/FormFile";
import FormInput from "@/components/Form/FormInput";
import FormEditor from "@/components/Form/FormTextEditor";
import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
import useAutoCompleteOptions from "@/hooks/use-auto-complete-options";
import useSlug from "@/hooks/use-slug";
import {
  getProductCategories,
  getProductCategoryEnums,
} from "@/thunks/product-category-thunks";
import { Grid2 } from "@mui/material";
import React, { useActionState, useState } from "react";
import { useTranslations } from "use-intl";

const ProductCategoriesForm = ({ onSubmit, productCategory }) => {
  const t = useTranslations("Forms.ProductCategories");

  const [{ inputs, errors }, submitAction, isPending] = useActionState(
    onSubmit,
    actionState({
      status: productCategory ? productCategory.status : "",
      type: productCategory ? productCategory.type : "",
      title: productCategory ? productCategory.title : "",
      slug: productCategory ? productCategory.slug : "",
      summary: productCategory ? productCategory.summary : "",
      content: productCategory ? productCategory.content : "",
      parent_id: productCategory ? productCategory.parentId : [],
      image: productCategory ? productCategory.image : null,
    })
  );

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const { handle: handleEnums, loading: loadingEnums } = useApi();

  const getProductCategoryEnumsHandler = async () => {
    if (statuses.length !== 0 && types.length !== 0) {
      return;
    }
    const data = await handleEnums(
      getProductCategoryEnums,
      {},
      {
        showSuccessAlert: false,
      }
    );
    setStatuses(data.enums.product_category.statuses);
    setTypes(data.enums.product_category.types);
  };

  const { handle: handleProductCategories, loading: loadingProductCategories } =
    useApi();
  const getProductCategoriesHandler = async (payload) => {
    const data = await handleProductCategories(
      getProductCategories,
      {
        payload,
      },
      { showSuccessAlert: false }
    );

    return data.product_categories;
  };
  const {
    options: productCategoriesOptions,
    onOpen: productCategoriesOnOpen,
    onScroll: productCategoresOnScroll,
    onSearch: productCategoriesOnSearch,
  } = useAutoCompleteOptions(getProductCategoriesHandler, {
    searchParams: ["title", "slug"],
  });

  const {
    loading: slugLoading,
    slug,
    onBlurInputHandler,
  } = useSlug("product_category", {
    initialValue: productCategory?.slug,
  });

  return (
    <Form action={submitAction} loading={isPending}>
      <Grid2 size={12}>
        <FormFile
          name="image"
          label={t("image_label")}
          inputs={inputs}
          errors={errors}
        />
      </Grid2>
      <FormAutoComplete
        name="status"
        label={t("status_label")}
        onOpen={getProductCategoryEnumsHandler}
        options={statuses}
        errors={errors}
        loading={loadingEnums}
        defaultValue={productCategory?.statusValue}
      />
      <FormAutoComplete
        name="type"
        label={t("type_label")}
        onOpen={getProductCategoryEnumsHandler}
        options={types}
        errors={errors}
        loading={loadingEnums}
        defaultValue={productCategory?.typeValue}
      />
      <FormAutoComplete
        name="parent_id"
        label={t("parent_label")}
        onOpen={productCategoriesOnOpen}
        options={productCategoriesOptions.data
          ?.map((productCategory) => ({
            label: productCategory.title,
            value: productCategory.id,
          }))
          ?.filter(
            (item) => item.value?.toString() !== productCategory?.id?.toString()
          )}
        errors={errors}
        loading={loadingProductCategories}
        onScroll={productCategoresOnScroll}
        onSearch={productCategoriesOnSearch}
        defaultValue={productCategory?.parentId}
      />
      {Object.keys(inputs)
        .filter(
          (name) =>
            ![
              "parent_id",
              "status",
              "type",
              "summary",
              "content",
              "image",
            ].includes(name)
        )
        .map((name) => (
          <FormInput
            key={name}
            name={name}
            label={t(`${name}_label`)}
            inputs={inputs}
            errors={errors}
            onInput={
              productCategory
                ? null
                : name === "title"
                ? onBlurInputHandler
                : null
            }
            defaultValue={name === "slug" ? slug : undefined}
            loading={name === "slug" ? slugLoading : undefined}
          />
        ))}
      <Grid2 size={12}>
        <FormInput
          name={"summary"}
          label={t(`summary_label`)}
          inputs={inputs}
          errors={errors}
          multiline
        />
      </Grid2>
      <Grid2 size={12}>
        <FormEditor
          name={"content"}
          label={t("content_label")}
          inputs={inputs}
          errors={errors}
          defaultValue={productCategory?.content}
        />
      </Grid2>
    </Form>
  );
};

export default ProductCategoriesForm;
