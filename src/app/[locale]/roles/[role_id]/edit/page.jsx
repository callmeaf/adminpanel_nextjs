"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import { useParams } from "next/navigation";
import RolesWrapper from "@/widgets/Roles/RolesWrapper";

const RolesEditPage = () => {
  const t = useTranslations("Pages.RolesEdit");
  const params = useParams();
  const { getMenu } = useDashboardMenus();

  return (
    <DashboardLayout>
      <PageHeader title={t("title")} backButtonUrl={getMenu("roles").href} />
      <RolesWrapper roleId={params.role_id} />
    </DashboardLayout>
  );
};

export default RolesEditPage;
