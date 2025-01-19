"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import UsersTable from "@/widgets/Users/UsersTable";
import PageTitle from "@/components/Layout/Partials/PageTitle";
import { useTranslations } from "use-intl";

const UsersPage = () => {
  const t = useTranslations("Pages.Users");
  return (
    <DashboardLayout>
      <PageTitle title={t("title")} />
      <UsersTable />
    </DashboardLayout>
  );
};

export default UsersPage;
