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
      status: "",
      type: "",
      first_name: "",
      last_name: "",
      mobile: "",
      national_code: "",
      email: "",
    })
  );

  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const { handle, loading } = useApi();

  const getUserEnumsHandler = async () => {
    if (statuses.length !== 0 && types.length !== 0) {
      return;
    }
    const result = await handle(getUserEnums);
    setStatuses(result.enums.user.statuses);
    setTypes(result.enums.user.types);
  };

  return (
    <Form action={submitAction} loading={isPending}>
      <FormAutoComplete
        name="status"
        label={t("status_label")}
        onOpen={getUserEnumsHandler}
        options={statuses}
        inputs={inputs}
        errors={errors}
        loading={loading}
      />
      <FormAutoComplete
        name="type"
        label={t("type_label")}
        onOpen={getUserEnumsHandler}
        options={types}
        inputs={inputs}
        errors={errors}
        loading={loading}
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
