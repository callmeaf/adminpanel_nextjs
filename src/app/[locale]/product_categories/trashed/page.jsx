"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import ProductCategoriesTrashedTable from "@/widgets/ProductCategories/ProductCategoriesTrashedTable";

const ProductCategoriesTrashedPage = () => {
  const t = useTranslations("Pages.ProductCategoriesTrashed");

  return (
    <DashboardLayout>
      <PageHeader title={t("title")} />
      <ProductCategoriesTrashedTable />
    </DashboardLayout>
  );
};

export default ProductCategoriesTrashedPage;
