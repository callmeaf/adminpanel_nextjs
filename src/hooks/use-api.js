import axios from "axios";
import {useLocale} from "next-intl";
import dataHandler from "@/utils/data-handler";
import {actionState} from "@/helpers";
import {useContext} from "react";
import {UiContext} from "@/context/ui/ui-context";
import {SET_MESSAGE} from "@/context/ui/action-types";
import {MESSAGE_TYPES} from "@/context/ui/init-state";
import {useRouter} from "@/i18n/routing";


const axiosInstance = axios.create()

export const useApi = () => {
    const locale = useLocale()
    axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL.replace('{locale}',locale)

    const router = useRouter()

    const {dispatch: uiDispatch} = useContext(UiContext)
    const handle = async (thunk, payload) => {
        const {getAllAsObject} = dataHandler(payload)

        const state = actionState(getAllAsObject())

        try {
            const {
                onInit,
                onSend,
                onSuccess,
                onError,
            } = thunk(axiosInstance, payload)

            const {
                data: {
                    result,
                    message,
                    status
                }
            } = await onSend()

            state.message = message
            state.status = status

            uiDispatch({
                type: SET_MESSAGE,
                payload: {
                    type: MESSAGE_TYPES.SUCCESS,
                    body: message,
                }
            })

            await onSuccess(result, router)
        } catch (exception) {
            const {
                response: {
                    status,
                    data: {
                        errors,
                        message,
                    }
                }
            } = exception

            state.message = message
            state.status = status
            uiDispatch({
                type: SET_MESSAGE,
                payload: {
                    type: MESSAGE_TYPES.ERROR,
                    body: message,
                }
            })

            if (errors) {
                state.errors = errors;
            }
        }

        return state
    }

    return {
        handle,
    }

}

export default useApi;