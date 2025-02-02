import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  deleteProductCategory,
  exportExcelProductCategories,
  getProductCategories,
  updateProductCategoriesStatusById,
} from "@/thunks/product-category-thunks";
import Table from "@/components/Table/Table";
import ProductCategoriesItemTable from "@/widgets/ProductCategories/ProductCategoriesItemTable";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { localStorageArtisan } from "@/helpers";
import TableRefresherData from "@/components/Table/TableRefresherData";
import { useRouter } from "@/i18n/routing";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import TableFilter from "@/components/Table/TableFilter";
import ProductCategoriesFilterTable from "./ProductCategoriesFilterTable";
import TableLoading from "@/components/Table/Partials/TableLoading";

const tableId = "ProductCategories_table";

const ProductCategoriesTable = () => {
  const tableTranslate = useTranslations("Tables.Table");
  const t = useTranslations("Tables.ProductCategories");

  const { get } = localStorageArtisan();

  const [productCategories, setProductCategories] = useState(null);

  const { handle, loading } = useApi();

  const getProductCategoriesHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId),
    };
    const data = await handle(getProductCategories, { payload }, options);
    setProductCategories(data.product_categories);
  };

  const ProductCategoriesExportExcelHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId, {}),
    };
    await handle(
      exportExcelProductCategories,
      {
        payload,
      },
      options
    );
  };

  const { getMenu } = useDashboardMenus();
  const router = useRouter();
  const editProductCategoryHandler = (payload) => {
    router.push(getMenu("product_categories_edit", payload).href);
  };

  const updateProductCategoriesStatusHandler = async (
    productCategoryId,
    payload
  ) => {
    await handle(updateProductCategoriesStatusById, {
      payload,
      extra: {
        product_category_id: productCategoryId,
      },
    });
    getProductCategoriesHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const deleteProductCategoryHandler = async (payload) => {
    await handle(deleteProductCategory, {
      payload,
    });
    getProductCategoriesHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  useEffect(() => {
    getProductCategoriesHandler().catch((e) => console.error({ e }));
  }, []);

  return (
    <Show
      loading={loading}
      loadingChild={() => <TableLoading />}
      loadingChildWithWhenChild
      when={productCategories}
      whenChild={() => (
        <>
          <Table
            id={tableId}
            t={t}
            loading={loading}
            heads={[
              {
                id: "id",
                label: t("id_label"),
              },
              {
                id: "title",
                label: t("title_label"),
              },
              {
                id: "parent",
                label: t("parent_label"),
              },
              {
                id: "status",
                label: tableTranslate("status_label"),
              },
              {
                id: "created_at",
                label: tableTranslate("created_at_label"),
              },
              {
                id: "actions",
                label: tableTranslate("actions_label"),
              },
            ]}
            pagination={productCategories.pagination}
            onPageChange={getProductCategoriesHandler}
            onPerPageChange={getProductCategoriesHandler}
            onSearch={getProductCategoriesHandler}
            searchParams={["title", "slug"]}
            onDateChange={getProductCategoriesHandler}
            filter={
              <TableFilter
                queryParamsLocalStorageKey={tableId}
                onFilter={getProductCategoriesHandler}
                filterItems={
                  <ProductCategoriesFilterTable
                    queryParamsLocalStorageKey={tableId}
                  />
                }
              />
            }
            onExcelExport={ProductCategoriesExportExcelHandler}
          >
            {productCategories.data.map((productCategory, index) => (
              <ProductCategoriesItemTable
                key={productCategory.id}
                productCategory={productCategory}
                index={index}
                startFrom={productCategories.pagination.meta.from}
                onEdit={editProductCategoryHandler}
                onStatusUpdate={updateProductCategoriesStatusHandler}
                onDelete={deleteProductCategoryHandler}
              />
            ))}
          </Table>
        </>
      )}
      elseChild={() => (
        <TableRefresherData
          queryParamsLocalStorageKey={tableId}
          onRefresh={getProductCategoriesHandler}
        />
      )}
    />
  );
};

export default ProductCategoriesTable;
