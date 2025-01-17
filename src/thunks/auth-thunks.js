import dataHandler from "@/utils/data-handler";


export const checkAuthenticateUser = (api, payload) => {
    return {
        onInit: (router, pathname) => {
            const {get} = dataHandler(payload)
            const authToken = get('authToken', localStorage.getItem('auth_token'))

            if (!authToken) {
                if (pathname === '/login') {
                    return false
                } else {
                    router.push('/login')
                    return false
                }
            }

            return true
        },
        onSend: async () => {
            return await api.get('/check_user')
        },
        onSuccess: async (result, router) => {
            router.push('/dashboard')
        },
        onError: async (exception, router) => {
            localStorage.removeItem('auth_token')
            router.push('/login')
        },
    }
}

export const loginViaMobilePassword = (api, payload) => {
    return {
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
    }

}