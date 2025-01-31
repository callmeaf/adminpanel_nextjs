import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  exportExcelRoles,
  forceDeleteUser,
  getRolesTrashed,
  restoreUser,
} from "@/thunks/user-thunks";
import Table from "@/components/Table/Table";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { localStorageArtisan } from "@/helpers";
import TableRefresherData from "@/components/Table/TableRefresherData";
import TableFilter from "@/components/Table/TableFilter";
import RolesFilterTable from "./RolesFilterTable";
import RolesItemTrashedTable from "./RolesItemTrashedTable";
import TableLoading from "@/components/Table/Partials/TableLoading";

const tableId = "roles_trashed_table";

const RolesTrashedTable = () => {
  const tableTranslate = useTranslations("Tables.Table");
  const t = useTranslations("Tables.Roles");

  const { get } = localStorageArtisan();

  const [Roles, setRoles] = useState(null);

  const { handle, loading } = useApi();

  const getRolesTrashedHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId),
    };
    const data = await handle(getRolesTrashed, { payload }, options);
    setRoles(data.Roles);
  };

  const restoreUserHandler = async (payload) => {
    await handle(restoreUser, {
      payload,
    });
    getRolesTrashedHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const forceDeleteUserHandler = async (payload) => {
    await handle(forceDeleteUser, {
      payload,
    });
    getRolesTrashedHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const RolesExportExcelHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId, {}),
    };

    payload.params.only_trashed = "true";
    await handle(
      exportExcelRoles,
      {
        payload,
        extra: {
          key: "Roles",
        },
      },
      options
    );
  };

  useEffect(() => {
    getRolesTrashedHandler().catch((e) => console.error({ e }));
  }, []);

  return (
    <Show
      loading={loading}
      loadingChild={() => <TableLoading />}
      loadingChildWithWhenChild
      when={Roles}
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
                id: "full_name",
                label: t("full_name_label"),
              },
              {
                id: "email",
                label: t("email_label"),
              },
              {
                id: "mobile",
                label: t("mobile_label"),
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
            pagination={Roles.pagination}
            onPageChange={getRolesTrashedHandler}
            onPerPageChange={getRolesTrashedHandler}
            onSearch={getRolesTrashedHandler}
            searchParams={["mobile", "email", "first_name", "last_name"]}
            onDateChange={getRolesTrashedHandler}
            onExcelExport={RolesExportExcelHandler}
            filter={
              <TableFilter
                queryParamsLocalStorageKey={tableId}
                onFilter={getRolesTrashedHandler}
                filterItems={
                  <RolesFilterTable queryParamsLocalStorageKey={tableId} />
                }
              />
            }
          >
            {Roles.data.map((user, index) => (
              <RolesItemTrashedTable
                key={user.id}
                user={user}
                index={index}
                startFrom={Roles.pagination.meta.from}
                onRestore={restoreUserHandler}
                onForceDelete={forceDeleteUserHandler}
              />
            ))}
          </Table>
        </>
      )}
      elseChild={() => (
        <TableRefresherData
          queryParamsLocalStorageKey={tableId}
          onRefresh={getRolesTrashedHandler}
        />
      )}
    />
  );
};

export default RolesTrashedTable;
