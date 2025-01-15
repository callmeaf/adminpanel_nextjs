import axios from "axios";
import {useLocale} from "next-intl";

const axiosInstance = axios.create()

const useApi  = () => {
    const locale = useLocale()
    axiosInstance.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL.replace('{locale}',locale)

    return axiosInstance
}

export default useApi;