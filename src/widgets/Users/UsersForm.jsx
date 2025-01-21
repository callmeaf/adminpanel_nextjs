import { actionState } from "@/helpers";
import { Button, Grid2, TextField } from "@mui/material";
import React, { useActionState } from "react";
import { useTranslations } from "use-intl";

const UsersForm = ({ onSubmit, user }) => {
  const t = useTranslations("Forms.Users");

  const [{ inputs, errors }, submitAction, isPending] = useActionState(
    onSubmit,
    actionState({
      first_name: "",
      last_name: "",
      mobile: "",
      national_code: "",
      status: "",
      type: "",
    })
  );
  return (
    <form action={submitAction}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <TextField
            id={`first_name`}
            name={"first_name"}
            label={t("first_name_label")}
            fullWidth
            variant={`standard`}
            defaultValue={inputs.first_name}
            error={!!errors?.first_name}
            helperText={errors?.first_name}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <TextField
            id={`last_name`}
            name={"last_name"}
            label={t("last_name_label")}
            fullWidth
            variant={`standard`}
            defaultValue={inputs.last_name}
            error={!!errors?.last_name}
            helperText={errors?.last_name}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <TextField
            id={`mobile`}
            name={"mobile"}
            label={t("mobile_label")}
            fullWidth
            variant={`standard`}
            defaultValue={inputs.mobile}
            error={!!errors?.mobile}
            helperText={errors?.mobile}
          />
        </Grid2>
        <Grid2>
          <Button type={"submit"} variant={`outlined`} loading={isPending}>
            {t("submit_label")}
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default UsersForm;
