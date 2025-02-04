import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  exportExcelProductCategories,
  forceDeleteProductCategory,
  getProductCategoriesTrashed,
  restoreProductCategory,
} from "@/thunks/product-category-thunks";
import Table from "@/components/Table/Table";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { localStorageArtisan } from "@/helpers";
import TableRefresherData from "@/components/Table/TableRefresherData";
import TableFilter from "@/components/Table/TableFilter";
import ProductCategoriesFilterTable from "./ProductCategoriesFilterTable";
import ProductCategoriesItemTrashedTable from "./ProductCategoriesItemTrashedTable";
import TableLoading from "@/components/Table/Partials/TableLoading";

const tableId = "product_categories_trashed_table";

const ProductCategoriesTrashedTable = () => {
  const tableTranslate = useTranslations("Tables.Table");
  const t = useTranslations("Tables.ProductCategories");

  const { get } = localStorageArtisan();

  const [productCategories, setProductCategories] = useState(null);

  const { handle, loading } = useApi();

  const getProductCategoriesTrashedHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId),
    };
    const data = await handle(
      getProductCategoriesTrashed,
      { payload },
      options
    );
    setProductCategories(data.product_categories);
  };

  const restoreProductCategoryHandler = async (payload) => {
    await handle(restoreProductCategory, {
      payload,
    });
    getProductCategoriesTrashedHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const forceDeleteProductCategoryHandler = async (payload) => {
    await handle(forceDeleteProductCategory, {
      payload,
    });
    getProductCategoriesTrashedHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const ProductCategoriesExportExcelHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId, {}),
    };

    payload.params.only_trashed = "true";
    await handle(
      exportExcelProductCategories,
      {
        payload,
      },
      options
    );
  };

  useEffect(() => {
    getProductCategoriesTrashedHandler().catch((e) => console.error({ e }));
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
            inTrashed
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
                id: "status",
                label: tableTranslate("status_label"),
              },
              {
                id: "deleted_at",
                label: tableTranslate("deleted_at_label"),
              },
              {
                id: "actions",
                label: tableTranslate("actions_label"),
              },
            ]}
            pagination={productCategories.pagination}
            onPageChange={getProductCategoriesTrashedHandler}
            onPerPageChange={getProductCategoriesTrashedHandler}
            onSearch={getProductCategoriesTrashedHandler}
            searchParams={["title", "slug"]}
            onDateChange={getProductCategoriesTrashedHandler}
            onExcelExport={ProductCategoriesExportExcelHandler}
            filter={
              <TableFilter
                queryParamsLocalStorageKey={tableId}
                onFilter={getProductCategoriesTrashedHandler}
                filterItems={
                  <ProductCategoriesFilterTable
                    queryParamsLocalStorageKey={tableId}
                  />
                }
              />
            }
          >
            {productCategories.data.map((productCategory, index) => (
              <ProductCategoriesItemTrashedTable
                key={productCategory.id}
                productCategory={productCategory}
                index={index}
                startFrom={productCategories.pagination.meta.from}
                onRestore={restoreProductCategoryHandler}
                onForceDelete={forceDeleteProductCategoryHandler}
              />
            ))}
          </Table>
        </>
      )}
      elseChild={() => (
        <TableRefresherData
          queryParamsLocalStorageKey={tableId}
          onRefresh={getProductCategoriesTrashedHandler}
        />
      )}
    />
  );
};

export default ProductCategoriesTrashedTable;
