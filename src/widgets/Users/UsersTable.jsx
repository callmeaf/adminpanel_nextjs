import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import { getUsers } from "@/thunks/user-thunks";
import Table from "@/components/Table/Table";
import UsersItemTable from "@/widgets/Users/UsersItemTable";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import { localStorageArtisan } from "@/helpers";

const tableId = "users_table";

const UsersTable = () => {
  const t = useTranslations("Tables.Users");

  const { get } = localStorageArtisan();

  const [users, setUsers] = useState(null);

  const { handle, loading } = useApi();

  const getUsersHandler = async (payload) => {
    try {
      payload = payload ?? {
        params: get(tableId),
      };
      const res = await handle(getUsers, { payload });
      setUsers(res.users);
    } catch (e) {
      throw e;
    }
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
            ]}
            pagination={users.pagination}
            onPageChange={getUsersHandler}
            onPerPageChange={getUsersHandler}
            onSearch={getUsersHandler}
            searchParams={["mobile", "email", "first_name", "last_name"]}
          >
            {users.data.map((user, index) => (
              <UsersItemTable
                key={user.id}
                user={user}
                index={index}
                startFrom={users.pagination.meta.from}
              />
            ))}
          </Table>
        </>
      )}
    />
  );
};

export default UsersTable;
