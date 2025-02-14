"use client";

import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useTranslations } from "use-intl";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import PageHeader from "@/components/Layout/Partials/PageHeader";
import { useParams } from "next/navigation";
import ProductsWrapper from "@/widgets/Products/ProductsWrapper";

const ProductsEditPage = () => {
  const t = useTranslations("Pages.ProductsEdit");
  const params = useParams();
  const { getMenu } = useDashboardMenus();

  return (
    <DashboardLayout>
      <PageHeader title={t("title")} backButtonUrl={getMenu("products").href} />
      <ProductsWrapper productId={params.product_id} />
    </DashboardLayout>
  );
};

export default ProductsEditPage;
