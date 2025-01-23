"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import { useParams } from "next/navigation";
import UsersWrapper from "@/widgets/Users/UsersWrapper";

const UsersEditPage = () => {
  const t = useTranslations("Pages.UsersEdit");
  const params = useParams();
  const { getMenu } = useDashboardMenus();

  return (
    <DashboardLayout>
      <PageHeader title={t("title")} backButtonUrl={getMenu("users").href} />
      <UsersWrapper userId={params.user_id} />
    </DashboardLayout>
  );
};

export default UsersEditPage;
