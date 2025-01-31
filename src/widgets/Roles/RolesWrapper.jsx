import React, { useEffect, useState } from "react";
import RolesForm from "./RolesForm";
import useApi from "@/hooks/use-api";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import {
  assignPermissionsToRole,
  createRole,
  getRoleById,
  updateRoleById,
} from "@/thunks/role-thunks";

const RolesWrapper = ({ roleId }) => {
  const { handle, loading } = useApi();

  const createRoleHandler = async (prevState, formData) => {
    const data = await handle(createRole, { payload: formData });
    const { role: roleData } = data;

    if (roleData) {
      await Promise.all([
        assignPermissionsToRoleHandler(roleData.id, formData),
      ]);
    }

    return data;
  };

  const updateRoleHandler = async (prevState, formData) => {
    const data = await handle(updateRoleById, {
      payload: formData,
      extra: {
        role_id: roleId,
      },
    });
    await Promise.all([assignPermissionsToRoleHandler(roleId, formData)]);

    return data;
  };

  const assignPermissionsToRoleHandler = async (roleId, formData) => {
    return await handle(
      assignPermissionsToRole,
      {
        payload: formData,
        extra: {
          role_id: roleId,
        },
      },
      {
        showSuccessAlert: false,
      }
    );
  };

  const [role, setRole] = useState(null);
  const getRoleByIdHandler = async () => {
    if (!roleId) {
      return;
    }
    const data = await handle(
      getRoleById,
      {
        payload: {
          role_id: roleId,
        },
      },
      {
        showSuccessAlert: false,
      }
    );

    setRole(data.role);
  };

  useEffect(() => {
    getRoleByIdHandler();
  }, [roleId]);

  return (
    <Show
      loading={loading}
      loadingChild={() => <LinearProgress />}
      when={roleId ? role : true}
      whenChild={() => (
        <RolesForm
          onSubmit={roleId ? updateRoleHandler : createRoleHandler}
          role={role}
        />
      )}
    />
  );
};

export default RolesWrapper;
