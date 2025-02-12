import { arrayArtisan } from "@/helpers";
import { Grid2, IconButton } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useTranslations } from "use-intl";
import VariationsWrapperItem from "./VariationsWrapperItem";
import { getVariationEnums } from "@/thunks/variation-thunks";
import useApi from "@/hooks/use-api";
import { getVariationTypes } from "@/thunks/variation-type-thunks";
import useAutoCompleteOptions from "@/hooks/use-auto-complete-options";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";

const { makeFromNumbers } = arrayArtisan();

const VariationsWrapper = ({ name, errors }) => {
  const [numbers, setNumbers] = useState(makeFromNumbers(3));

  const moreVariationsHandler = () => {
    setNumbers([
      ...numbers,
      {
        id: numbers.length + 1,
      },
    ]);
  };

  const t = useTranslations("Forms.Variations");

  const [statuses, setStatuses] = useState([]);
  const { handle: handleEnums, loading: loadingEnums } = useApi();

  const getVariationEnumsHandler = async () => {
    if (statuses.length !== 0) {
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
  };

  const { handle: handleVariationTypes, loading: loadingVariationTypes } =
    useApi();

  const getVariationTypesHandler = async () => {
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

  const variationRemoveHandler = (number, variation) => {
    setNumbers(
      numbers.filter((item) => item.id.toString() !== number.id.toString())
    );
  };

  console.log({ variaitonTypesOptions });
  const variaitonTypesOptionsTransformed = useMemo(
    () =>
      variaitonTypesOptions.data?.map((variationType) => ({
        label: variationType.title,
        value: variationType.id,
      })),
    [variaitonTypesOptions.data?.length]
  );

  return (
    <Grid2 container spacing={3}>
      {numbers.map((number, index) => (
        <Grid2 size={12} key={number.id}>
          <VariationsWrapperItem
            title={`# ${index + 1}`}
            number={number}
            name={name}
            t={t}
            onOpenEnum={getVariationEnumsHandler}
            loadingEnums={loadingEnums}
            errors={errors}
            statuses={statuses}
            onOpenVariationTypes={variaitonTypesOnOpen}
            onScrollVariationTypes={variaitonTypesOnScroll}
            onSearchVariationTypes={variaitonTypesOnSearch}
            variationTypes={variaitonTypesOptionsTransformed}
            loadingVariationTypes={loadingVariationTypes}
            onRemoveVariation={variationRemoveHandler}
          />
        </Grid2>
      ))}
      <IconButton onClick={moreVariationsHandler}>
        <AddCircleIcon />
      </IconButton>
    </Grid2>
  );
};

export default VariationsWrapper;
