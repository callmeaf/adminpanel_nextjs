import React, { useEffect, useState } from "react";
import useApi from "@/hooks/use-api";
import {
  deleteRole,
  exportExcelRoles,
  getRoles,
  updateRoleStatusById,
} from "@/thunks/role-thunks";
import Table from "@/components/Table/Table";
import RolesItemTable from "@/widgets/Roles/RolesItemTable";
import { useTranslations } from "next-intl";
import Show from "@/components/Show";
import { localStorageArtisan } from "@/helpers";
import TableRefresherData from "@/components/Table/TableRefresherData";
import { useRouter } from "@/i18n/routing";
import useDashboardMenus from "@/hooks/use-dashboard-menus";
import TableFilter from "@/components/Table/TableFilter";
import RolesFilterTable from "./RolesFilterTable";
import TableLoading from "@/components/Table/Partials/TableLoading";

const tableId = "roles_table";

const RolesTable = () => {
  const tableTranslate = useTranslations("Tables.Table");
  const t = useTranslations("Tables.Roles");

  const { get } = localStorageArtisan();

  const [roles, setRoles] = useState(null);

  const { handle, loading } = useApi();

  const getRolesHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId),
    };
    const data = await handle(getRoles, { payload }, options);
    setRoles(data.roles);
  };

  const RolesExportExcelHandler = async (payload, options) => {
    payload = payload ?? {
      params: get(tableId, {}),
    };
    await handle(
      exportExcelRoles,
      {
        payload,
      },
      options
    );
  };

  const { getMenu } = useDashboardMenus();
  const router = useRouter();
  const editRoleHandler = (payload) => {
    router.push(getMenu("roles_edit", payload).href);
  };

  const updateRoleStatusHandler = async (roleId, payload) => {
    await handle(updateRoleStatusById, {
      payload,
      extra: {
        role_id: roleId,
      },
    });
    getRolesHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  const deleteRoleHandler = async (payload) => {
    await handle(deleteRole, {
      payload,
    });
    getRolesHandler(undefined, {
      showSuccessAlert: false,
    });
  };

  useEffect(() => {
    getRolesHandler().catch((e) => console.error({ e }));
  }, []);

  return (
    <Show
      loading={loading}
      loadingChild={() => <TableLoading />}
      loadingChildWithWhenChild
      when={roles}
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
                id: "created_at",
                label: tableTranslate("created_at_label"),
              },
              {
                id: "actions",
                label: tableTranslate("actions_label"),
              },
            ]}
            pagination={roles.pagination}
            onPageChange={getRolesHandler}
            onPerPageChange={getRolesHandler}
            onSearch={getRolesHandler}
            searchParams={["name", "name_fa"]}
            onDateChange={getRolesHandler}
            onExcelExport={RolesExportExcelHandler}
          >
            {roles.data.map((role, index) => (
              <RolesItemTable
                key={role.id}
                role={role}
                index={index}
                startFrom={roles.pagination.meta.from}
                onEdit={editRoleHandler}
                onStatusUpdate={updateRoleStatusHandler}
                onDelete={deleteRoleHandler}
              />
            ))}
          </Table>
        </>
      )}
      elseChild={() => (
        <TableRefresherData
          queryParamsLocalStorageKey={tableId}
          onRefresh={getRolesHandler}
        />
      )}
    />
  );
};

export default RolesTable;
