"use client";

import { createContext, useEffect, useReducer } from "react";
import initState from "@/context/auth/init-state";
import reducer from "@/context/auth/reducer";
import useApi from "@/hooks/use-api";
import {
  checkAuthenticateUser,
  getAuthenticateUser,
} from "@/thunks/auth-thunks";
import { usePathname } from "@/i18n/routing";

export const AuthContext = createContext(initState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { handle } = useApi();
  const pathname = usePathname();

  useEffect(() => {
    handle(
      checkAuthenticateUser,
      {},
      {
        showSuccessAlert: false,
      }
    );
  }, []);

  useEffect(() => {
    handle(
      getAuthenticateUser,
      {
        ctx: {
          state,
          dispatch,
        },
      },
      {
        showSuccessAlert: false,
      }
    );
  }, [pathname]);

  return <AuthContext value={{ state, dispatch }}>{children}</AuthContext>;
};

export default AuthProvider;
