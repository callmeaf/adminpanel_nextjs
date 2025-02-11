import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormInput from "@/components/Form/FormInput";
import { Close as CloseIcon } from "@mui/icons-material";
import { Box, Grid2, IconButton, Typography } from "@mui/material";
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
    onRemoveVariation(number, variation);
  };
  return (
    <Box sx={{ boxShadow: 3, p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton color="error" onClick={removeVariationHandler}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Grid2 container spacing={3}>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <FormAutoComplete
            name={`${name}[]status`}
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
            name={`${name}[]variation_type`}
            label={t("variation_type_label")}
            onOpen={onOpenVariationTypes}
            onScroll={onScrollVariationTypes}
            onSearch={onSearchVariationTypes}
            options={variationTypes}
            errors={errors}
            loading={loadingVariationTypes}
            defaultValue={variation?.statusValue}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <FormInput
            name={`${name}[]title`}
            label={t(`title_label`)}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4, lg: 2 }}>
          <FormInput
            name={`${name}[]stock`}
            label={t(`stock_label`)}
            errors={errors}
            type={"number"}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 5 }}>
          <FormInput
            name={`${name}[]price`}
            label={t(`price_label`)}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 5 }}>
          <FormInput
            name={`${name}[]discount_price`}
            label={t(`discount_price_label`)}
            errors={errors}
          />
        </Grid2>
        <Grid2 size={12}>
          <FormInput
            name={`${name}[]content`}
            label={t(`content_label`)}
            errors={errors}
            multiline
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default VariationsWrapperItem;
