import axios from "axios";
import { useLocale } from "next-intl";
import dataHandler from "@/utils/data-handler";
import { actionState } from "@/helpers";
import { useContext, useState } from "react";
import { UiContext } from "@/context/ui/ui-context";
import { SET_MESSAGE } from "@/context/ui/action-types";
import { MESSAGE_TYPES } from "@/context/ui/init-state";
import { usePathname, useRouter } from "@/i18n/routing";

const axiosInstance = axios.create();

const prepareAxiosInstance = (locale) => {
  axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL.replace(
    "{locale}",
    locale
  );

  if (typeof window !== "undefined") {
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      axiosInstance.defaults.headers["Authorization"] = `Bearer ${authToken}`;
    }
  }
};

export const useApi = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  prepareAxiosInstance(locale);

  const { state: uiState, dispatch: uiDispatch } = useContext(UiContext);
  const { message: oldMessage } = uiState;

  const [loading, setLoading] = useState(null);
  const handle = async (
    thunk,
    { payload, ctx, extra = {} } = {},
    { showSuccessAlert = true, showErrorAlert = true, hasFile = false } = {}
  ) => {
    const { getAllAsObject } = dataHandler(payload);
    const finalData = actionState(
      getAllAsObject([], {
        keyReplaces: {
          "[]": "",
        },
      })
    );
    if (hasFile) {
      axiosInstance.defaults.headers.common["Content-Type"] =
        "multipart/form-data";
    }
    const { onInit, onSend, onSuccess, onError } = thunk(
      axiosInstance,
      payload,
      extra
    );

    let continueSending = true;
    try {
      if (onInit) {
        continueSending = await onInit({
          ctx,
          router,
          pathname,
        });
      }
      if (!continueSending) {
        return;
      }
      setLoading(true);

      const {
        data: { result, message, status },
      } = await onSend();

      finalData.message = message;
      finalData.status = status;
      if (showSuccessAlert) {
        uiDispatch({
          type: SET_MESSAGE,
          payload: {
            type: MESSAGE_TYPES.SUCCESS,
            body: message,
          },
        });
      }

      if (onSuccess) {
        await onSuccess({
          ctx,
          result,
          router,
          pathname,
          finalData,
        });
      }
    } catch (exception) {
      console.error(`Thunk Error: ${thunk}`, { exception });
      const {
        response: {
          status,
          data: { errors, message },
        },
      } = exception;

      finalData.message = message;
      finalData.status = status;
      if (showErrorAlert) {
        uiDispatch({
          type: SET_MESSAGE,
          payload: {
            type: MESSAGE_TYPES.ERROR,
            body:
              oldMessage.type === MESSAGE_TYPES.ERROR &&
              oldMessage.body === message
                ? `${message} !`
                : message,
          },
        });
      }

      if (errors) {
        finalData.errors = errors;
      }

      if (onError) {
        await onError({
          exception,
          router,
          pathname,
          status,
          finalData,
        });
      }
    } finally {
      setLoading(false);
    }

    return finalData;
  };

  return {
    handle,
    loading,
  };
};

export default useApi;
