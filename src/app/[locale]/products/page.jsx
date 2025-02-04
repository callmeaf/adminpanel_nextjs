"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ProductsTable from "@/widgets/Products/ProductsTable";
import { useTranslations } from "use-intl";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import useDashboardMenus from "@/hooks/use-dashboard-menus";

const ProductsPage = () => {
  const t = useTranslations("Pages.Products");

  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader
        title={t("title")}
        createButtonUrl={getMenu("products_create").href}
      />
      <ProductsTable />
    </DashboardLayout>
  );
};

export default ProductsPage;
