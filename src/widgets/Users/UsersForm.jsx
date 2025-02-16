import Form from "@/components/Form/Form";
import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormFile from "@/components/Form/FormFile";
import FormInput from "@/components/Form/FormInput";
import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
import useAutoCompleteOptions from "@/hooks/use-auto-complete-options";
import { getRoles } from "@/thunks/role-thunks";
import { getUserEnums } from "@/thunks/user-thunks";
import { Grid2 } from "@mui/material";
import React, { useActionState, useState } from "react";
import { useTranslations } from "use-intl";

const UsersForm = ({ onSubmit, user }) => {
  const t = useTranslations("Forms.Users");

  const [{ inputs, errors }, submitAction, isPending] = useActionState(
    onSubmit,
    actionState({
      status: user ? user.status : "",
      type: user ? user.type : "",
      first_name: user ? user.firstName : "",
      last_name: user ? user.lastName : "",
      mobile: user ? user.mobile : "",
      national_code: user ? user.nationalCode : "",
      email: user ? user.email : "",
      roles: user ? user.rolesIds : [],
      image: user ? user.image : null,
    })
  );

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const { handle: handleEnums, loading: loadingEnums } = useApi();

  const getUserEnumsHandler = async () => {
    if (statuses.length !== 0 && types.length !== 0) {
      return;
    }
    const data = await handleEnums(
      getUserEnums,
      {},
      {
        showSuccessAlert: false,
      }
    );
    setStatuses(data.enums.user.statuses);
    setTypes(data.enums.user.types);
  };

  const { handle: handleRoles, loading: loadingRoles } = useApi();
  const getRolesHandler = async (payload) => {
    const data = await handleRoles(
      getRoles,
      {
        payload,
      },
      { showSuccessAlert: false }
    );

    return data.roles;
  };
  const {
    options: rolesOptions,
    onOpen: rolesOnOpen,
    onScroll: rolesOnScroll,
    onSearch: rolesOnSearch,
  } = useAutoCompleteOptions(getRolesHandler, {
    searchParams: ["name", "name_fa"],
    optionsTransformer: (role) => ({
      label: role.labelText,
      value: role.id,
    }),
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
        onOpen={getUserEnumsHandler}
        options={statuses}
        errors={errors}
        loading={loadingEnums}
        defaultValue={user?.statusValue}
      />
      <FormAutoComplete
        name="type"
        label={t("type_label")}
        onOpen={getUserEnumsHandler}
        options={types}
        errors={errors}
        loading={loadingEnums}
        defaultValue={user?.typeValue}
      />

      {Object.keys(inputs)
        .filter((name) =>
          [
            "first_name",
            "last_name",
            "mobile",
            "national_code",
            "email",
          ].includes(name)
        )
        .map((name) => (
          <FormInput
            key={name}
            name={name}
            label={t(`${name}_label`)}
            inputs={inputs}
            errors={errors}
          />
        ))}

      <Grid2 size={12}>
        <FormAutoComplete
          name="roles"
          label={t("roles_label")}
          onOpen={rolesOnOpen}
          options={rolesOptions}
          errors={errors}
          loading={loadingRoles}
          multiple
          onScroll={rolesOnScroll}
          onSearch={rolesOnSearch}
          defaultValue={user?.rolesValues()}
        />
      </Grid2>
    </Form>
  );
};

export default UsersForm;
