import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  exportExcelProducts,
  forceDeleteproduct,
  getProductsTrashed,
  restoreproduct,
} from "@/thunks/product-thunks";
import Table from "@/components/Table/Table";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { localStorageArtisan } from "@/helpers";
import TableRefresherData from "@/components/Table/TableRefresherData";
import TableFilter from "@/components/Table/TableFilter";
import ProductsFilterTable from "./ProductsFilterTable";
import ProductsItemTrashedTable from "./ProductsItemTrashedTable";
import TableLoading from "@/components/Table/Partials/TableLoading";

const tableId = "products_trashed_table";

const ProductsTrashedTable = () => {
  const tableTranslate = useTranslations("Tables.Table");
  const t = useTranslations("Tables.Products");

  const { get } = localStorageArtisan();

  const [products, setProducts] = useState(null);

  const { handle, loading } = useApi();

  const getProductsTrashedHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId),
    };
    const data = await handle(getProductsTrashed, { payload }, options);
    setProducts(data.products);
  };

  const restoreProductHandler = async (payload) => {
    await handle(restoreproduct, {
      payload,
    });
    getProductsTrashedHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const forceDeleteProductHandler = async (payload) => {
    await handle(forceDeleteproduct, {
      payload,
    });
    getProductsTrashedHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const productsExportExcelHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId, {}),
    };

    payload.params.only_trashed = "true";
    await handle(
      exportExcelProducts,
      {
        payload,
      },
      options
    );
  };

  useEffect(() => {
    getProductsTrashedHandler().catch((e) => console.error({ e }));
  }, []);

  return (
    <Show
      loading={loading}
      loadingChild={() => <TableLoading />}
      loadingChildWithWhenChild
      when={products}
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
                id: "author",
                label: t("author_label"),
              },
              {
                id: "province",
                label: t("province_label"),
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
            pagination={products.pagination}
            onPageChange={getProductsTrashedHandler}
            onPerPageChange={getProductsTrashedHandler}
            onSearch={getProductsTrashedHandler}
            searchParams={["title", "slug"]}
            onDateChange={getProductsTrashedHandler}
            onExcelExport={productsExportExcelHandler}
            filter={
              <TableFilter
                queryParamsLocalStorageKey={tableId}
                onFilter={getProductsTrashedHandler}
                filterItems={
                  <ProductsFilterTable queryParamsLocalStorageKey={tableId} />
                }
              />
            }
          >
            {products.data.map((product, index) => (
              <ProductsItemTrashedTable
                key={product.id}
                product={product}
                index={index}
                startFrom={products.pagination.meta.from}
                onRestore={restoreProductHandler}
                onForceDelete={forceDeleteProductHandler}
              />
            ))}
          </Table>
        </>
      )}
      elseChild={() => (
        <TableRefresherData
          queryParamsLocalStorageKey={tableId}
          onRefresh={getProductsTrashedHandler}
        />
      )}
    />
  );
};

export default ProductsTrashedTable;
