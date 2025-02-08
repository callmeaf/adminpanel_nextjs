import FormAutoComplete from "@/components/Form/FormAutoComplete";
import { Grid2 } from "@mui/material";
import React from "react";

const VariationsWrapperItem = ({
  name,
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
}) => {
  return (
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
    </Grid2>
  );
};

export default VariationsWrapperItem;
