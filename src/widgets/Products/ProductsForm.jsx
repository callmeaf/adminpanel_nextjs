import Form from "@/components/Form/Form";
import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormFile from "@/components/Form/FormFile";
import FormInput from "@/components/Form/FormInput";
import FormMultiFile from "@/components/Form/FormMultiFile";
import FormEditor from "@/components/Form/FormTextEditor";
import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
import useAutoCompleteOptions from "@/hooks/use-auto-complete-options";
import useSlug from "@/hooks/use-slug";
import { getProductCategories } from "@/thunks/product-category-thunks";
import { getProductEnums } from "@/thunks/product-thunks";
import { getProvinces } from "@/thunks/province-thunks";
import { getUsers } from "@/thunks/user-thunks";
import { Grid2 } from "@mui/material";
import React, { useActionState, useState } from "react";
import { useTranslations } from "use-intl";
import VariationsWrapper from "../Variations/VariationsWrapper";

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
      province_id: product ? product.provinceId : null,
      author_id: product ? product.authorId : null,
      image: product ? product.image : null,
      images: product ? product.images : [],
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
    onScroll: productCategoriesOnScroll,
    onSearch: productCategoriesOnSearch,
  } = useAutoCompleteOptions(getProductCategoriesHandler, {
    searchParams: ["title", "slug"],
    optionsTransformer: (productCategory) => ({
      label: productCategory.labelText,
      value: productCategory.id,
    }),
  });

  const { handle: handleProvinces, loading: loadingProvinces } = useApi();
  const getProvincesHandler = async (payload) => {
    const data = await handleProvinces(
      getProvinces,
      {
        payload,
      },
      { showSuccessAlert: false }
    );

    return data.provinces;
  };
  const {
    options: provincesOptions,
    onOpen: provincesOnOpen,
    onScroll: provincesOnScroll,
    onSearch: provincesOnSearch,
  } = useAutoCompleteOptions(getProvincesHandler, {
    searchParams: ["name", "code"],
    optionsTransformer: (province) => ({
      label: province.labelText,
      value: province.id,
    }),
  });

  const { handle: handleAuthors, loading: loadingAuthors } = useApi();
  const getAuthorsHandler = async (payload) => {
    const data = await handleAuthors(
      getUsers,
      {
        payload,
      },
      { showSuccessAlert: false }
    );

    return data.users;
  };
  const {
    options: authorsOptions,
    onOpen: authorsOnOpen,
    onScroll: authorsOnScroll,
    onSearch: authorsOnSearch,
  } = useAutoCompleteOptions(getAuthorsHandler, {
    searchParams: ["first_name", "last_name"],
    optionsTransformer: (author) => ({
      label: author.labelText,
      value: author.id,
    }),
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
      <Grid2 size={12}>
        <FormMultiFile
          name="images"
          label={t("images_label")}
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
        name="province_id"
        label={t("province_label")}
        onOpen={provincesOnOpen}
        options={provincesOptions}
        errors={errors}
        loading={loadingProvinces}
        onScroll={provincesOnScroll}
        onSearch={provincesOnSearch}
        defaultValue={product?.provinceValue()}
      />
      {Object.keys(inputs)
        .filter((name) => ["title", "slug"].includes(name))
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
      <FormAutoComplete
        name="author_id"
        label={t("author_label")}
        onOpen={authorsOnOpen}
        options={authorsOptions}
        errors={errors}
        loading={loadingAuthors}
        onScroll={authorsOnScroll}
        onSearch={authorsOnSearch}
        defaultValue={product?.authorValue()}
      />
      <Grid2 size={12}>
        <FormAutoComplete
          name="cats"
          label={t("cats_label")}
          onOpen={productCategoriesOnOpen}
          options={productCategoriesOptions}
          errors={errors}
          loading={loadingProductCategories}
          multiple
          onScroll={productCategoriesOnScroll}
          onSearch={productCategoriesOnSearch}
          defaultValue={product?.catsValues()}
        />
      </Grid2>
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
      <Grid2 size={12}>
        <VariationsWrapper
          name={"variations"}
          errors={errors}
          variations={product?.variations}
        />
      </Grid2>
    </Form>
  );
};

export default ProductsForm;
