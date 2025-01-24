import FormAutoComplete from "@/components/Form/FormAutoComplete";
import { localStorageArtisan } from "@/helpers";
import useApi from "@/hooks/use-api";
import { getUserEnums } from "@/thunks/user-thunks";
import { MenuItem } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslations } from "use-intl";

const UsersFilterTable = ({ queryParamsLocalStorageKey }) => {
  const { get, replace } = localStorageArtisan();
  const tableParams = get(queryParamsLocalStorageKey, {
    status: "",
    type: "",
  });

  const t = useTranslations("Tables.Table");

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const { handle, loading } = useApi();

  const getUserEnumsHandler = async () => {
    if (statuses.length && types.length) {
      return;
    }
    const data = await handle(
      getUserEnums,
      {},
      {
        showSuccessAlert: false,
      }
    );
    setStatuses(data.enums.user.statuses);
    setTypes(data.enums.user.types);
  };

  useEffect(() => {
    getUserEnumsHandler();
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
          onOpen={getUserEnumsHandler}
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
          onOpen={getUserEnumsHandler}
          options={types}
          loading={loading}
          defaultValue={memoTypeValue}
          onlyLoadIfOptionLoaded
        />
      </MenuItem>
    </>
  );
};

export default UsersFilterTable;
