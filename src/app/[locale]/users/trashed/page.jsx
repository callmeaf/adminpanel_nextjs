"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import UsersTrashedTable from "@/widgets/Users/UsersTrashedTable";

const UsersTrashedPage = () => {
  const t = useTranslations("Pages.UsersTrashed");

  return (
    <DashboardLayout>
      <PageHeader title={t("title")} />
      <UsersTrashedTable />
    </DashboardLayout>
  );
};

export default UsersTrashedPage;
