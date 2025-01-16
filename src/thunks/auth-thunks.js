import dataHandler from "@/utils/data-handler";
import {redirect} from "@/i18n/routing";

export const loginViaMobilePassword = (api, payload) => {
    return {
        onInit: null,
        onSend: async () => {
            const {get} = dataHandler(payload)
            const formData = new FormData()
            formData.append('mobile', get('mobile'))
            formData.append('password', get('password'))

            return await api.post('/login_via_mobile', formData)
        },
        onSuccess: (result, router) => {
            localStorage.setItem('auth_token', result.token)
            router.push('/dashboard')
        },
        onError: null,
    }

}