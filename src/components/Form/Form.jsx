import { Button, Grid2 } from "@mui/material";
import { useTranslations } from "next-intl";
import React from "react";

const Form = ({ action, children, loading, t }) => {
  t = t ?? useTranslations("Forms.Form");

  return (
    <form action={action}>
      <Grid2 container spacing={2}>
        {React.Children.toArray(children).map((child) =>
          child.type === Grid2 ? (
            child
          ) : (
            <Grid2 key={child.key} size={{ xs: 12, md: 6, lg: 4 }}>
              {child}
            </Grid2>
          )
        )}
        <Grid2 size={12}>
          <Button type={"submit"} variant={`outlined`} loading={loading}>
            {t("submit_label")}
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default Form;
