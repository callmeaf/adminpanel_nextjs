import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  deleteProduct,
  exportExcelProducts,
  getProducts,
  updateProductsStatusById,
} from "@/thunks/product-thunks";
import Table from "@/components/Table/Table";
import ProductsItemTable from "@/widgets/Products/ProductsItemTable";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { localStorageArtisan } from "@/helpers";
import TableRefresherData from "@/components/Table/TableRefresherData";
import { useRouter } from "@/i18n/routing";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import TableFilter from "@/components/Table/TableFilter";
import ProductsFilterTable from "./ProductsFilterTable";
import TableLoading from "@/components/Table/Partials/TableLoading";

const tableId = "products_table";

const ProductsTable = () => {
  const tableTranslate = useTranslations("Tables.Table");
  const t = useTranslations("Tables.Products");

  const { get } = localStorageArtisan();

  const [products, setProducts] = useState(null);

  const { handle, loading } = useApi();

  const getProductsHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId),
    };
    const data = await handle(getProducts, { payload }, options);
    setProducts(data.products);
  };

  const productsExportExcelHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId, {}),
    };
    await handle(
      exportExcelProducts,
      {
        payload,
      },
      options
    );
  };

  const { getMenu } = useDashboardMenus();
  const router = useRouter();
  const editProductHandler = (payload) => {
    router.push(getMenu("products_edit", payload).href);
  };

  const updateProductsStatusHandler = async (productId, payload) => {
    await handle(updateProductsStatusById, {
      payload,
      extra: {
        product_id: productId,
      },
    });
    getProductsHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const deleteProductHandler = async (payload) => {
    await handle(deleteProduct, {
      payload,
    });
    getProductsHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  useEffect(() => {
    getProductsHandler().catch((e) => console.error({ e }));
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
                id: "created_at",
                label: tableTranslate("created_at_label"),
              },
              {
                id: "actions",
                label: tableTranslate("actions_label"),
              },
            ]}
            pagination={products.pagination}
            onPageChange={getProductsHandler}
            onPerPageChange={getProductsHandler}
            onSearch={getProductsHandler}
            searchParams={["title", "slug"]}
            onDateChange={getProductsHandler}
            filter={
              <TableFilter
                queryParamsLocalStorageKey={tableId}
                onFilter={getProductsHandler}
                filterItems={
                  <ProductsFilterTable queryParamsLocalStorageKey={tableId} />
                }
              />
            }
            onExcelExport={productsExportExcelHandler}
          >
            {products.data.map((product, index) => (
              <ProductsItemTable
                key={product.id}
                product={product}
                index={index}
                startFrom={products.pagination.meta.from}
                onEdit={editProductHandler}
                onStatusUpdate={updateProductsStatusHandler}
                onDelete={deleteProductHandler}
              />
            ))}
          </Table>
        </>
      )}
      elseChild={() => (
        <TableRefresherData
          queryParamsLocalStorageKey={tableId}
          onRefresh={getProductsHandler}
        />
      )}
    />
  );
};

export default ProductsTable;
