import React, { useEffect, useState } from "react";
import UsersForm from "./UsersForm";
import useApi from "@/hooks/use-api";
import {
  assignRolesToUser,
  createUser,
  getUserById,
  updateProfileImageUser,
  updateUserById,
} from "@/thunks/user-thunks";
import Show from "@/components/Show";
import { LinearProgress } from "@mui/material";
import { jsonArtisan, typeOf } from "@/helpers";
import dataHandler from "@/utils/data-handler";

const UsersWrapper = ({ userId }) => {
  const { handle, loading } = useApi();

  const [user, setUser] = useState(null);
  const getUserByIdHandler = async () => {
    if (!userId) {
      return;
    }
    const data = await handle(
      getUserById,
      {
        payload: {
          user_id: userId,
        },
      },
      {
        showSuccessAlert: false,
      }
    );

    setUser(data.user);
  };

  const createUserHandler = async (prevState, formData) => {
    const data = await handle(createUser, { payload: formData });
    const { user: userData } = data;

    if (userData) {
      await Promise.all([
        assignRolesToUserHandler(userData.id, formData),
        updateProfileImageUserHandler(userData.id, formData),
      ]);
    }

    return data;
  };

  const updateUserHandler = async (prevState, formData) => {
    const data = await handle(updateUserById, {
      payload: formData,
      extra: {
        user_id: userId,
      },
    });
    await Promise.all([
      assignRolesToUserHandler(userId, formData),
      updateProfileImageUserHandler(userId, formData),
    ]);

    return data;
  };

  const assignRolesToUserHandler = async (userId, formData) => {
    if (user) {
      const userRoles = user.roles.map((role) => role.id);
      const { getAll } = dataHandler(formData);
      const formRoles = getAll("roles[]", []);

      const { toJson } = jsonArtisan();
      if (toJson(userRoles.sort()) === toJson(formRoles.sort())) {
        return;
      }
    }

    return await handle(
      assignRolesToUser,
      {
        payload: formData,
        extra: {
          user_id: userId,
        },
      },
      {
        showSuccessAlert: false,
      }
    );
  };

  const updateProfileImageUserHandler = async (userId, formData) => {
    const { isUploadedFile } = typeOf(formData.get("image"));
    if (!isUploadedFile) {
      return;
    }

    return await handle(
      updateProfileImageUser,
      {
        payload: formData,
        extra: {
          user_id: userId,
        },
      },
      {
        showSuccessAlert: false,
        hasFile: true,
      }
    );
  };

  useEffect(() => {
    getUserByIdHandler();
  }, [userId]);

  return (
    <Show
      loading={loading}
      loadingChild={() => <LinearProgress />}
      when={userId ? user : true}
      whenChild={() => (
        <UsersForm
          onSubmit={userId ? updateUserHandler : createUserHandler}
          user={user}
        />
      )}
    />
  );
};

export default UsersWrapper;
