"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";

const UsersEditPage = () => {
  const t = useTranslations("Pages.UsersEdit");
  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader title={t("title")} backButtonUrl={getMenu("users").href} />
    </DashboardLayout>
  );
};

export default UsersEditPage;
