import Form from "@/components/Form/Form";
import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormInput from "@/components/Form/FormInput";
import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
import { getRoles } from "@/thunks/permission-thunks";
import { getUserEnums } from "@/thunks/user-thunks";
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
      roles: [],
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
  const [roles, setRoles] = useState({});
  const getRolesHandler = async ({ searchValue } = {}) => {
    console.log({ roles });
    if (
      !searchValue &&
      roles.pagination &&
      !roles.pagination.meta.hasNextPage()
    ) {
      return;
    }
    const data = await handleRoles(
      getRoles,
      {
        payload: {
          params: {
            page: searchValue ? 1 : roles.pagination?.meta?.nextPage,
            name: searchValue,
            name_fa: searchValue,
          },
        },
      },
      { showSuccessAlert: false }
    );
    setRoles(data.roles.mergeData(roles.data));
  };

  return (
    <Form action={submitAction} loading={isPending}>
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
        .filter((name) => !["status", "type", "roles"].includes(name))
        .map((name) => (
          <FormInput
            key={name}
            name={name}
            label={t(`${name}_label`)}
            inputs={inputs}
            errors={errors}
          />
        ))}

      <FormAutoComplete
        name="role"
        label={t("role_label")}
        onOpen={getRolesHandler}
        options={roles.data?.map((role) => ({
          label: role.fullName,
          value: role.id,
        }))}
        errors={errors}
        loading={loadingRoles}
        multiple
        onScroll={getRolesHandler}
        onSearch={getRolesHandler}
        // defaultValue={user?.typeValue}
      />
    </Form>
  );
};

export default UsersForm;
