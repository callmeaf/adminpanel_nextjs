"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import ProductCategoriesWrapper from "@/widgets/ProductCategories/ProductCategoriesWrapper";

const ProductCategoriesCreatePage = () => {
  const t = useTranslations("Pages.ProductCategoriesCreate");
  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader
        title={t("title")}
        backButtonUrl={getMenu("product_categories").href}
      />
      <ProductCategoriesWrapper />
    </DashboardLayout>
  );
};

export default ProductCategoriesCreatePage;
