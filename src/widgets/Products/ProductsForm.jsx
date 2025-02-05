import Form from "@/components/Form/Form";
import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormFile from "@/components/Form/FormFile";
import FormInput from "@/components/Form/FormInput";
import FormEditor from "@/components/Form/FormTextEditor";
import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
import useAutoCompleteOptions from "@/hooks/use-auto-complete-options";
import useSlug from "@/hooks/use-slug";
import { getProducts, getProductEnums } from "@/thunks/product-category-thunks";
import { Grid2 } from "@mui/material";
import React, { useActionState, useState } from "react";
import { useTranslations } from "use-intl";

const ProductsForm = ({ onSubmit, product }) => {
  const t = useTranslations("Forms.Products");

  const [{ inputs, errors }, submitAction, isPending] = useActionState(
    onSubmit,
    actionState({
      status: product ? product.status : "",
      type: product ? product.type : "",
      title: product ? product.title : "",
      slug: product ? product.slug : "",
      summary: product ? product.summary : "",
      content: product ? product.content : "",
      parent_id: product ? product.parentId : [],
      image: product ? product.image : null,
    })
  );

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const { handle: handleEnums, loading: loadingEnums } = useApi();

  const getProductEnumsHandler = async () => {
    if (statuses.length !== 0 && types.length !== 0) {
      return;
    }
    const data = await handleEnums(
      getProductEnums,
      {},
      {
        showSuccessAlert: false,
      }
    );
    setStatuses(data.enums.product.statuses);
    setTypes(data.enums.product.types);
  };

  const { handle: handleProducts, loading: loadingProducts } = useApi();
  const getProductsHandler = async (payload) => {
    const data = await handleProducts(
      getProducts,
      {
        payload,
      },
      { showSuccessAlert: false }
    );

    return data.products;
  };
  const {
    options: productsOptions,
    onOpen: productsOnOpen,
    onScroll: productsOnScroll,
    onSearch: productsOnSearch,
  } = useAutoCompleteOptions(getProductsHandler, {
    searchParams: ["title", "slug"],
  });

  const {
    loading: slugLoading,
    slug,
    onBlurInputHandler,
  } = useSlug("product", {
    initialValue: product?.slug,
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
        onOpen={getProductEnumsHandler}
        options={statuses}
        errors={errors}
        loading={loadingEnums}
        defaultValue={product?.statusValue}
      />
      <FormAutoComplete
        name="type"
        label={t("type_label")}
        onOpen={getProductEnumsHandler}
        options={types}
        errors={errors}
        loading={loadingEnums}
        defaultValue={product?.typeValue}
      />
      <FormAutoComplete
        name="parent_id"
        label={t("parent_label")}
        onOpen={productsOnOpen}
        options={productsOptions.data
          ?.map((product) => ({
            label: product.title,
            value: product.id,
          }))
          ?.filter(
            (item) => item.value?.toString() !== product?.id?.toString()
          )}
        errors={errors}
        loading={loadingProducts}
        onScroll={productsOnScroll}
        onSearch={productsOnSearch}
        defaultValue={product?.parentValue()}
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
              product ? null : name === "title" ? onBlurInputHandler : null
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
          defaultValue={product?.content}
        />
      </Grid2>
    </Form>
  );
};

export default ProductsForm;
