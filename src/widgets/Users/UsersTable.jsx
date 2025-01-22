import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import { deleteUser, getUsers } from "@/thunks/user-thunks";
import Table from "@/components/Table/Table";
import UsersItemTable from "@/widgets/Users/UsersItemTable";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import { localStorageArtisan } from "@/helpers";
import TableRefresherData from "@/components/Table/TableRefresherData";
import { useRouter } from "@/i18n/routing";
import useDashboardMenus from "@/hooks/use-dashboard-menus";

const tableId = "users_table";

const UsersTable = () => {
  const tableTranslate = useTranslations("Tables.Table");
  const t = useTranslations("Tables.Users");

  const { get } = localStorageArtisan();

  const [users, setUsers] = useState(null);

  const { handle, loading } = useApi();

  const getUsersHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId),
    };
    const result = await handle(getUsers, { payload }, options);
    setUsers(result.users);
  };

  const { getMenu } = useDashboardMenus();
  const router = useRouter();
  const editUserHandler = (payload) => {
    router.push(getMenu("users_edit", payload).href);
  };

  const deleteUserHandler = async (payload) => {
    await handle(deleteUser, {
      payload,
    });
    getUsersHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  useEffect(() => {
    getUsersHandler().catch((e) => console.error({ e }));
  }, []);

  return (
    <Show
      loading={loading}
      loadingChild={<LinearProgress key={"loading"} hidden={!loading} />}
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
                id: "created_at",
                label: t("created_at_label"),
              },
              {
                id: "actions",
                label: tableTranslate("actions_label"),
              },
            ]}
            pagination={users.pagination}
            onPageChange={getUsersHandler}
            onPerPageChange={getUsersHandler}
            onSearch={getUsersHandler}
            searchParams={["mobile", "email", "first_name", "last_name"]}
            onDateChange={getUsersHandler}
          >
            {users.data.map((user, index) => (
              <UsersItemTable
                key={user.id}
                user={user}
                index={index}
                startFrom={users.pagination.meta.from}
                onEdit={editUserHandler}
                onDelete={deleteUserHandler}
              />
            ))}
          </Table>
        </>
      )}
      elseChild={() => (
        <TableRefresherData tableId={tableId} onRefresh={getUsersHandler} />
      )}
    />
  );
};

export default UsersTable;
