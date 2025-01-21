import React from "react";
import UsersForm from "./UsersForm";
import useApi from "@/hooks/use-api";
import { createUser } from "@/thunks/user-thunks";

const UsersWrapper = () => {
  const { handle } = useApi();

  const createUserHandler = async (prevState, formData) => {
    return await handle(createUser, { payload: formData });
  };

  return <UsersForm onSubmit={createUserHandler} />;
};

export default UsersWrapper;
