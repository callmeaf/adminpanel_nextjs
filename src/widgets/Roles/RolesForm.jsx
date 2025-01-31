import Form from "@/components/Form/Form";
import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormInput from "@/components/Form/FormInput";
import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
import useAutoCompleteOptions from "@/hooks/use-auto-complete-options";
import { getRoles } from "@/thunks/role-thunks";
import { Grid2 } from "@mui/material";
import React, { useActionState, useState } from "react";
import { useTranslations } from "use-intl";

const RolesForm = ({ onSubmit, role }) => {
  const t = useTranslations("Forms.Roles");

  const [{ inputs, errors }, submitAction, isPending] = useActionState(
    onSubmit,
    actionState({
      name: role ? role.name : "",
      name_fa: role ? role.nameFa : "",
      permissions: role ? role.permissionsIds : [],
    })
  );

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
  });

  return (
    <Form action={submitAction} loading={isPending}>
      {Object.keys(inputs)
        .filter((name) => !["permissions"].includes(name))
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
          name="permissions"
          label={t("permissions_label")}
          onOpen={permissionsOnOpen}
          options={permissionsOptions.data?.map((permission) => ({
            label: permission.fullName,
            value: permission.id,
          }))}
          errors={errors}
          loading={loadingPermissions}
          multiple
          onScroll={permissionsOnScroll}
          onSearch={permissionsOnSearch}
          defaultValue={role?.permissionsValues()}
        />
      </Grid2>
    </Form>
  );
};

export default RolesForm;
