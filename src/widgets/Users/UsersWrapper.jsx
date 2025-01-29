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
import axios from "axios";

const UsersWrapper = ({ userId }) => {
  const { handle, loading } = useApi();

  const createUserHandler = async (prevState, formData) => {
    const data = await handle(createUser, { payload: formData });
    if (data.user) {
      const promises = [
        handle(
          assignRolesToUser,
          {
            payload: formData,
            extra: {
              user_id: data.user.id,
            },
          },
          {
            showSuccessAlert: false,
          }
        ),
      ];

      if (formData.get("image") instanceof File) {
        promises.push(
          handle(
            updateProfileImageUser,
            {
              payload: formData,
              extra: {
                user_id: data.user.id,
              },
            },
            {
              showSuccessAlert: false,
              hasFile: true,
            }
          )
        );
      }

      await Promise.all(promises);
    }

    return data;
  };

  const updateUserHandler = async (prevState, formData) => {
    return await handle(updateUserById, {
      payload: formData,
      extra: {
        user_id: userId,
      },
    });
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
