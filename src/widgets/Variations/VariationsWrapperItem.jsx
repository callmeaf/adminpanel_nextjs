import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormFile from "@/components/Form/FormFile";
import FormInput from "@/components/Form/FormInput";
import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Grid2, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";

const VariationsWrapperItem = ({
  name,
  number,
  title,
  t,
  statuses,
  errors,
  loadingEnums,
  onOpenEnum,
  onOpenVariationTypes,
  onScrollVariationTypes,
  onSearchVariationTypes,
  variationTypes,
  loadingVariationTypes,
  variation,
  onRemoveVariation,
}) => {
  const removeVariationHandler = () => {
    onRemoveVariation({
      number,
      variation,
    });
  };

  const inputName = (str) => `${name}[]${str}`;

  return (
    <Box sx={{ boxShadow: 3, p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{title}</Typography>
        <Tooltip title={t("variation_delete_tooltip")}>
          <IconButton color="error" onClick={removeVariationHandler}>
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid2 container spacing={3}>
        {variation && (
          <input type="hidden" name={inputName("id")} value={variation.id} />
        )}

        <Grid2 size={12}>
          <FormFile
            name={inputName("image")}
            label={t("image_label")}
            errors={errors}
            inputs={{
              [inputName("image")]: variation?.image,
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <FormAutoComplete
            name={inputName("status")}
            label={t("status_label")}
            onOpen={onOpenEnum}
            options={statuses}
            errors={errors}
            loading={loadingEnums}
            defaultValue={variation?.statusValue}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <FormAutoComplete
            name={inputName("variation_type")}
            label={t("variation_type_label")}
            onOpen={onOpenVariationTypes}
            onScroll={onScrollVariationTypes}
            onSearch={onSearchVariationTypes}
            options={variationTypes}
            errors={errors}
            loading={loadingVariationTypes}
            defaultValue={variation?.typeValue()}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <FormInput
            name={inputName("title")}
            label={t(`title_label`)}
            errors={errors}
            defaultValue={variation?.title}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4, lg: 2 }}>
          <FormInput
            name={inputName("stock")}
            label={t(`stock_label`)}
            errors={errors}
            type={"number"}
            defaultValue={variation?.stock}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 5 }}>
          <FormInput
            name={inputName("price")}
            label={t(`price_label`)}
            errors={errors}
            defaultValue={variation?.price}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 5 }}>
          <FormInput
            name={inputName("discount_price")}
            label={t(`discount_price_label`)}
            errors={errors}
            defaultValue={variation?.discountPrice}
          />
        </Grid2>
        <Grid2 size={12}>
          <FormInput
            name={inputName("content")}
            label={t(`content_label`)}
            errors={errors}
            multiline
            defaultValue={variation?.content}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default VariationsWrapperItem;
