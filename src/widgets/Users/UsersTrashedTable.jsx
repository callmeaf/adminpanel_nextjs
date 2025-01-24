import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  forceDeleteUser,
  getUsersTrashed,
  restoreUser,
} from "@/thunks/user-thunks";
import Table from "@/components/Table/Table";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import { localStorageArtisan } from "@/helpers";
import TableRefresherData from "@/components/Table/TableRefresherData";
import TableFilter from "@/components/Table/TableFilter";
import UsersFilterTable from "./UsersFilterTable";
import UsersItemTrashedTable from "./UsersItemTrashedTable";

const tableId = "users_trashed_table";

const UsersTrashedTable = () => {
  const tableTranslate = useTranslations("Tables.Table");
  const t = useTranslations("Tables.Users");

  const { get } = localStorageArtisan();

  const [users, setUsers] = useState(null);

  const { handle, loading } = useApi();

  const getUsersTrashedHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId),
    };
    const data = await handle(getUsersTrashed, { payload }, options);
    setUsers(data.users);
  };

  const restoreUserHandler = async (payload) => {
    await handle(restoreUser, {
      payload,
    });
    getUsersTrashedHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const forceDeleteUserHandler = async (payload) => {
    await handle(forceDeleteUser, {
      payload,
    });
    getUsersTrashedHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  useEffect(() => {
    getUsersTrashedHandler().catch((e) => console.error({ e }));
  }, []);

  return (
    <Show
      loading={loading}
      loadingChild={() => <LinearProgress key={"loading"} hidden={!loading} />}
      loadingChildWithWhenChild
      when={users}
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
            pagination={users.pagination}
            onPageChange={getUsersTrashedHandler}
            onPerPageChange={getUsersTrashedHandler}
            onSearch={getUsersTrashedHandler}
            searchParams={["mobile", "email", "first_name", "last_name"]}
            onDateChange={getUsersTrashedHandler}
            filter={
              <TableFilter
                queryParamsLocalStorageKey={tableId}
                onFilter={getUsersTrashedHandler}
                filterItems={
                  <UsersFilterTable queryParamsLocalStorageKey={tableId} />
                }
              />
            }
          >
            {users.data.map((user, index) => (
              <UsersItemTrashedTable
                key={user.id}
                user={user}
                index={index}
                startFrom={users.pagination.meta.from}
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
          onRefresh={getUsersTrashedHandler}
        />
      )}
    />
  );
};

export default UsersTrashedTable;
