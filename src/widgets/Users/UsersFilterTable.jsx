import FormAutoComplete from "@/components/Form/FormAutoComplete";
import useApi from "@/hooks/use-api";
import { getUserEnums } from "@/thunks/user-thunks";
import { MenuItem } from "@mui/material";
import React, { useState } from "react";
import { useTranslations } from "use-intl";

const UsersFilterTable = ({ queryParamsLocalStorageKey }) => {
  const inputs = {
    status: "",
    type: "",
  };

  const t = useTranslations("Tables.Table");

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const { handle, loading } = useApi();

  const getUserEnumsHandler = async () => {
    if (statuses.length !== 0 && types.length !== 0) {
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

  return (
    <>
      <MenuItem sx={{ display: "block" }}>
        <FormAutoComplete
          name="status"
          label={t("status_label")}
          onOpen={getUserEnumsHandler}
          options={statuses}
          inputs={inputs}
          loading={loading}
        />
      </MenuItem>
      <MenuItem sx={{ display: "block" }}>
        <FormAutoComplete
          name="type"
          label={t("type_label")}
          onOpen={getUserEnumsHandler}
          options={types}
          inputs={inputs}
          loading={loading}
        />
      </MenuItem>
    </>
  );
};

export default UsersFilterTable;
