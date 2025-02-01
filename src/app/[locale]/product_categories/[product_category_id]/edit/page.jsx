"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import { useParams } from "next/navigation";
import ProductCategoriesWrapper from "@/widgets/ProductCategories/ProductCategoriesWrapper";

const ProductCategoriesEditPage = () => {
  const t = useTranslations("Pages.ProductCategoriesEdit");
  const params = useParams();
  const { getMenu } = useDashboardMenus();

  return (
    <DashboardLayout>
      <PageHeader
        title={t("title")}
        backButtonUrl={getMenu("product_categories").href}
      />
      <ProductCategoriesWrapper
        productCategoryId={params.product_category_id}
      />
    </DashboardLayout>
  );
};

export default ProductCategoriesEditPage;
