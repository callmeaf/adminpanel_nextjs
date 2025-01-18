import axios from "axios";
import {useLocale} from "next-intl";
import dataHandler from "@/utils/data-handler";
import {actionState} from "@/helpers";
import {useContext} from "react";
import {UiContext} from "@/context/ui/ui-context";
import {SET_MESSAGE} from "@/context/ui/action-types";
import {MESSAGE_TYPES} from "@/context/ui/init-state";
import {usePathname, useRouter} from "@/i18n/routing";


const axiosInstance = axios.create()

export const useApi = () => {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL.replace('{locale}',locale)
    if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('auth_token')
        if (authToken) {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${authToken}`
        }
    }


    const {dispatch: uiDispatch} = useContext(UiContext)
    const handle = async (thunk, {
        payload, ctx
    } = {}) => {
        const {getAllAsObject} = dataHandler(payload)

        const state = actionState(getAllAsObject())
        const {
            onInit,
            onSend,
            onSuccess,
            onError,
        } = thunk(axiosInstance, payload)

        let continueSending = true
        try {
            if (onInit) {
                continueSending = await onInit({
                    ctx, router, pathname
                })
            }
            if (!continueSending) {
                return
            }
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
            if (onSuccess) {
                await onSuccess({
                    ctx, result, router, pathname
                })
            }
        } catch (exception) {
            console.error({exception})
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

            if (onError) {
                await onError({
                    exception, router, pathname, status
                })
            }
        }

        return state
    }

    return {
        handle,
    }

}

export default useApi;