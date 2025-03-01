"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import RolesWrapper from "@/widgets/Roles/RolesWrapper";

const RolesCreatePage = () => {
  const t = useTranslations("Pages.RolesCreate");
  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader title={t("title")} backButtonUrl={getMenu("roles").href} />
      <RolesWrapper />
    </DashboardLayout>
  );
};

export default RolesCreatePage;
