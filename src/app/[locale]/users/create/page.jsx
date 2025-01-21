"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import UsersWrapper from "@/widgets/Users/UsersWrapper";

const UsersCreatePage = () => {
  const t = useTranslations("Pages.UsersCreate");
  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader title={t("title")} backButtonUrl={getMenu("users").href} />
      <UsersWrapper />
    </DashboardLayout>
  );
};

export default UsersCreatePage;
