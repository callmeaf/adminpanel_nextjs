import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import LoginForm from "@/widgets/Auth/LoginForm";
import { useTranslations } from "next-intl";
import useApi from "@/hooks/use-api";
import { loginViaMobilePassword } from "@/thunks/auth-thunks";

const LoginWrapper = () => {
  const t = useTranslations("Pages.Login");
  const { handle } = useApi();

  const loginHandler = async (prevState, formData) => {
    try {
      return await handle(loginViaMobilePassword, {
        payload: formData,
      });
    } catch (e) {}
  };
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: "400px", m: "auto" }}>
        <CardContent>
          <Typography
            variant={`h5`}
            component={"div"}
            marginBottom={5}
            textAlign={"center"}
          >
            {t("title")}
          </Typography>
          <LoginForm onSubmit={loginHandler} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginWrapper;
