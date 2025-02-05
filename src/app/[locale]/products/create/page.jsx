"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import ProductsWrapper from "@/widgets/Products/ProductsWrapper";

const ProductsCreatePage = () => {
  const t = useTranslations("Pages.Products");
  const { getMenu } = useDashboardMenus();
  return (
    <DashboardLayout>
      <PageHeader title={t("title")} backButtonUrl={getMenu("products").href} />
      <ProductsWrapper />
    </DashboardLayout>
  );
};

export default ProductsCreatePage;
