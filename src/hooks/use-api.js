import axios from "axios";
import {useLocale} from "next-intl";
import dataHandler from "@/utils/data-handler";

const axiosInstance = axios.create()

export const useApi = () => {
    const locale = useLocale()
    axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL.replace('{locale}',locale)

    const handle = async (thunk, payload) => {
        const {getAllAsObject} = dataHandler(payload)

        const state = getAllAsObject()
        try {
            const {
                data: {
                    result,
                    message,
                    status
                }
            } = await thunk(axiosInstance, payload)

            state.message = message
            state.status = status

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