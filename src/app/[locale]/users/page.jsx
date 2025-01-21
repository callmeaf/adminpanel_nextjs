"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import UsersTable from "@/widgets/Users/UsersTable";
import { useTranslations } from "use-intl";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import useDashboardMenus from "@/hooks/use-dashboard-menus";

const UsersPage = () => {
  const t = useTranslations("Pages.Users");

  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader
        title={t("title")}
        createButtonUrl={getMenu("users_create").href}
      />
      <UsersTable />
    </DashboardLayout>
  );
};

export default UsersPage;
