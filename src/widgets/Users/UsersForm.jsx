import { actionState } from "@/helpers";
import useApi from "@/hooks/use-api";
import { getUserEnums } from "@/thunks/user-thunks";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useActionState, useEffect, useState } from "react";
import { useTranslations } from "use-intl";

const UsersForm = ({ onSubmit, user }) => {
  const t = useTranslations("Forms.Users");
  const commonTranslate = useTranslations("Common.Components");

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

  // useEffect(() => {
  //   getUserEnumsHandler();
  // }, []);
  console.log({ inputs, statuses });
  return (
    <form action={submitAction}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <Autocomplete
            onOpen={getUserEnumsHandler}
            options={statuses}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value.toString() === value.value.toString()
            }
            defaultValue={inputs.state}
            loading={loading}
            loadingText={commonTranslate("loading_label")}
            renderInput={(params) => {
              return (
                <>
                  <TextField
                    {...params}
                    label={t("status_label")}
                    variant="standard"
                    error={!!errors?.status}
                    helperText={errors?.status}
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
                            ) : null}
                            {params.InputProps.endAdornment}
                          </>
                        ),
                      },
                    }}
                  />
                  <input
                    type="hidden"
                    name="status"
                    defaultValue={
                      statuses.find(
                        (status) =>
                          status.label.toString() ===
                          params.inputProps.value?.toString()
                      )?.value
                    }
                  />
                </>
              );
            }}
          />
        </Grid2>
        {/* <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth size="small" error={!!errors?.status}>
            <InputLabel id="status_label">{t("status_label")}</InputLabel>
            <Select
              labelId="status_label"
              id="status"
              name="status"
              label={t("status_label")}
              variant="standard"
              defaultValue={inputs.status}
            >
              {statuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors?.status}</FormHelperText>
          </FormControl>
        </Grid2> */}
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <FormControl fullWidth size="small" error={!!errors?.type}>
            <InputLabel id="type_label">{t("type_label")}</InputLabel>
            <Select
              labelId="type_label"
              id="type"
              name="type"
              label={t("type_label")}
              variant="standard"
              defaultValue={inputs.type}
            >
              {types.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors?.type}</FormHelperText>
          </FormControl>
        </Grid2>
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
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <TextField
            id={`national_code`}
            name={"national_code"}
            label={t("national_code_label")}
            fullWidth
            variant={`standard`}
            defaultValue={inputs.national_code}
            error={!!errors?.national_code}
            helperText={errors?.national_code}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <TextField
            id={`email`}
            name={"email"}
            label={t("email_label")}
            fullWidth
            variant={`standard`}
            defaultValue={inputs.email}
            error={!!errors?.email}
            helperText={errors?.email}
          />
        </Grid2>
        <Grid2 size={12}>
          <Button type={"submit"} variant={`outlined`} loading={isPending}>
            {t("submit_label")}
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default UsersForm;
