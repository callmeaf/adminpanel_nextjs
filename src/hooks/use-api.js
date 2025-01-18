import axios from "axios";
import {useLocale} from "next-intl";
import dataHandler from "@/utils/data-handler";
import {actionState} from "@/helpers";
import {useContext, useState} from "react";
import {UiContext} from "@/context/ui/ui-context";
import {SET_MESSAGE} from "@/context/ui/action-types";
import {MESSAGE_TYPES} from "@/context/ui/init-state";
import {usePathname, useRouter} from "@/i18n/routing";


const axiosInstance = axios.create()

const prepareAxiosInstance = (locale) => {
    axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL.replace('{locale}',locale)
    if (typeof window !== 'undefined') {
        const authToken = localStorage.getItem('auth_token')
        if (authToken) {
            axiosInstance.defaults.headers['Authorization'] = `Bearer ${authToken}`
        }
    }
}

export const useApi = () => {
    const locale = useLocale()
    const router = useRouter()
    const pathname = usePathname()

    prepareAxiosInstance(locale)

    const {dispatch: uiDispatch} = useContext(UiContext)

    const [loading, setLoading] = useState(false)
    const handle = async (thunk, {
        payload, ctx
    } = {}) => {
        const {getAllAsObject} = dataHandler(payload)

        const finalData = actionState(getAllAsObject())
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
            setLoading(true)
            const {
                data: {
                    result,
                    message,
                    status
                }
            } = await onSend()

            finalData.message = message
            finalData.status = status

            uiDispatch({
                type: SET_MESSAGE,
                payload: {
                    type: MESSAGE_TYPES.SUCCESS,
                    body: message,
                }
            })
            if (onSuccess) {
                await onSuccess({
                    ctx, result, router, pathname, finalData
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

            finalData.message = message
            finalData.status = status
            uiDispatch({
                type: SET_MESSAGE,
                payload: {
                    type: MESSAGE_TYPES.ERROR,
                    body: message,
                }
            })

            if (errors) {
                finalData.errors = errors;
            }

            if (onError) {
                await onError({
                    exception, router, pathname, status
                })
            }
        } finally {
            setLoading(false)
        }
        return finalData
    }

    return {
        handle,
        loading,
    }

}

export default useApi;