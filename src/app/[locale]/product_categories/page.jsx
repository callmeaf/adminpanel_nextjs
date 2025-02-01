"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ProductCategoriesTable from "@/widgets/ProductCategories/ProductCategoriesTable";
import { useTranslations } from "use-intl";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import useDashboardMenus from "@/hooks/use-dashboard-menus";

const ProductCategoriesPage = () => {
  const t = useTranslations("Pages.ProductCategories");

  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader
        title={t("title")}
        createButtonUrl={getMenu("product_categories_create").href}
      />
      <ProductCategoriesTable />
    </DashboardLayout>
  );
};

export default ProductCategoriesPage;
