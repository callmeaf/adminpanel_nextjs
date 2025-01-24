import Form from "@/components/Form/Form";
import FormAutoComplete from "@/components/Form/FormAutoComplete";
import FormInput from "@/components/Form/FormInput";
import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
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
    })
  );

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
    <Form action={submitAction} loading={isPending}>
      <FormAutoComplete
        name="status"
        label={t("status_label")}
        onOpen={getUserEnumsHandler}
        options={statuses}
        errors={errors}
        loading={loading}
        defaultValue={user?.statusValue}
      />
      <FormAutoComplete
        name="type"
        label={t("type_label")}
        onOpen={getUserEnumsHandler}
        options={types}
        errors={errors}
        loading={loading}
        defaultValue={user?.typeValue}
      />
      {Object.keys(inputs)
        .filter((name) => !["status", "type"].includes(name))
        .map((name) => (
          <FormInput
            key={name}
            name={name}
            label={t(`${name}_label`)}
            inputs={inputs}
            errors={errors}
          />
        ))}
    </Form>
  );
};

export default UsersForm;
