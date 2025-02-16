import Form from "@/components/Form/Form";
import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormInput from "@/components/Form/FormInput";
import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
import useAutoCompleteOptions from "@/hooks/use-auto-complete-options";
import { getPermissions } from "@/thunks/permission-thunks";
import { Grid2 } from "@mui/material";
import React, { useActionState, useMemo } from "react";
import { useTranslations } from "use-intl";

const RolesForm = ({ onSubmit, role }) => {
  const t = useTranslations("Forms.Roles");

  const [{ inputs, errors }, submitAction, isPending] = useActionState(
    onSubmit,
    actionState({
      name: role ? role.name : "",
      name_fa: role ? role.nameFa : "",
    })
  );

  const { handle: handlePermissions, loading: loadingPermissions } = useApi();
  const getPermissionsHandler = async (payload = {}) => {
    payload.params = {
      per_page: 999,
      ...payload.params,
    };

    const data = await handlePermissions(
      getPermissions,
      {
        payload,
      },
      { showSuccessAlert: false }
    );

    return data.permissions;
  };
  const {
    options: permissionsOptions,
    onOpen: permissionsOnOpen,
    onScroll: permissionsOnScroll,
  } = useAutoCompleteOptions(getPermissionsHandler, {
    searchParams: ["name"],
    optionsTransformer: (permission) => ({
      label: permission.labelText,
      value: permission.id,
    }),
  });

  return (
    <Form action={submitAction} loading={isPending}>
      {Object.keys(inputs)
        .filter((name) => ["name", "name_fa"].includes(name))
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
          options={permissionsOptions}
          errors={errors}
          loading={loadingPermissions}
          multiple
          onScroll={permissionsOnScroll}
          defaultValue={role?.permissionsValues()}
        />
      </Grid2>
    </Form>
  );
};

export default RolesForm;
