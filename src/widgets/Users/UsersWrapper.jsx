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
import { typeOf } from "@/helpers";

const UsersWrapper = ({ userId }) => {
  const { handle, loading } = useApi();

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
    if (isUploadedFile) {
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
    }
  };

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
