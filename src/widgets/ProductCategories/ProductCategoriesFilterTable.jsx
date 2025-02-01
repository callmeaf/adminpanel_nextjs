import FormAutoComplete from "@/components/Form/FormAutoComplete";
import { localStorageArtisan } from "@/helpers";
import useApi from "@/hooks/use-api";
import { getProductCategoryEnums } from "@/thunks/product-category-thunks";
import { MenuItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "use-intl";

const ProductCategoriesFilterTable = ({ queryParamsLocalStorageKey }) => {
  const { get } = localStorageArtisan();
  const tableParams = get(queryParamsLocalStorageKey, {
    status: "",
    type: "",
  });

  const t = useTranslations("Tables.Table");

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const { handle, loading } = useApi();

  const getProductCategoryEnumsHandler = async () => {
    if (statuses.length && types.length) {
      return;
    }
    const data = await handle(
      getProductCategoryEnums,
      {},
      {
        showSuccessAlert: false,
      }
    );
    setStatuses(data.enums.product_category.statuses);
    setTypes(data.enums.product_category.types);
  };

  useEffect(() => {
    getProductCategoryEnumsHandler();
  }, []);

  const memoStatusValue = useMemo(
    () =>
      statuses.find(
        (status) => status.value.toString() === tableParams.status?.toString()
      ),
    [statuses.length]
  );

  const memoTypeValue = useMemo(
    () =>
      types.find(
        (type) => type.value.toString() === tableParams.type?.toString()
      ),
    [types.length]
  );

  return (
    <>
      <MenuItem sx={{ display: "block" }}>
        <FormAutoComplete
          name="status"
          label={t("status_label")}
          onOpen={getProductCategoryEnumsHandler}
          options={statuses}
          loading={loading}
          defaultValue={memoStatusValue}
          onlyLoadIfOptionLoaded
        />
      </MenuItem>
      <MenuItem sx={{ display: "block" }}>
        <FormAutoComplete
          name="type"
          label={t("type_label")}
          onOpen={getProductCategoryEnumsHandler}
          options={types}
          loading={loading}
          defaultValue={memoTypeValue}
          onlyLoadIfOptionLoaded
        />
      </MenuItem>
    </>
  );
};

export default ProductCategoriesFilterTable;
