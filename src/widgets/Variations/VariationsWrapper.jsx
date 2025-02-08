import { arrayArtisan } from "@/helpers";
import { Grid2 } from "@mui/material";
import React, { useState } from "react";
import { useTranslations } from "use-intl";
import VariationsWrapperItem from "./VariationsWrapperItem";
import { getVariationEnums } from "@/thunks/variation-thunks";
import useApi from "@/hooks/use-api";
import { getVariationTypes } from "@/thunks/variation-type-thunks";
import useAutoCompleteOptions from "@/hooks/use-auto-complete-options";

const { makeFromNumbers } = arrayArtisan();

const VariationsWrapper = ({ name, errors }) => {
  const [numbers, setNumbers] = useState(makeFromNumbers(3));
  const t = useTranslations("Forms.Variations");

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const { handle: handleEnums, loading: loadingEnums } = useApi();

  const getVariationEnumsHandler = async () => {
    if (statuses.length !== 0 && types.length !== 0) {
      return;
    }
    const data = await handleEnums(
      getVariationEnums,
      {},
      {
        showSuccessAlert: false,
      }
    );
    setStatuses(data.enums.variation.statuses);
    setTypes(data.enums.variation.types);
  };

  const { handle: handleVariationTypes, loading: loadingVariationTypes } =
    useApi();

  const getVariationTypesHandler = async () => {
    if (statuses.length !== 0 && types.length !== 0) {
      return;
    }
    const data = await handleVariationTypes(
      getVariationTypes,
      {},
      {
        showSuccessAlert: false,
      }
    );

    return data.variation_types;
  };

  const {
    options: variaitonTypesOptions,
    onOpen: variaitonTypesOnOpen,
    onScroll: variaitonTypesOnScroll,
    onSearch: variaitonTypesOnSearch,
  } = useAutoCompleteOptions(getVariationTypesHandler, {
    searchParams: ["title"],
  });

  console.log({ variaitonTypesOptions });
  return (
    <Grid2 container spacing={3}>
      {numbers.map((number) => (
        <Grid2 size={12} key={number.id}>
          <VariationsWrapperItem
            name={name}
            t={t}
            onOpenEnum={getVariationEnumsHandler}
            loadingEnums={loadingEnums}
            errors={errors}
            statuses={statuses}
            onOpenVariationTypes={variaitonTypesOnOpen}
            onScrollVariationTypes={variaitonTypesOnScroll}
            onSearchVariationTypes={variaitonTypesOnSearch}
            variationTypes={variaitonTypesOptions.data?.map(
              (variationType) => ({
                label: variationType.title,
                value: variationType.id,
              })
            )}
            loadingVariationTypes={loadingVariationTypes}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default VariationsWrapper;
