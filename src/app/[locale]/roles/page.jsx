"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import RolesTable from "@/widgets/Roles/RolesTable";

const RolesPage = () => {
  const t = useTranslations("Pages.Roles");

  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader
        title={t("title")}
        createButtonUrl={getMenu("roles_create").href}
      />
      <RolesTable />
    </DashboardLayout>
  );
};

export default RolesPage;
