import dataHandler from "@/utils/data-handler";
import {SET_USER} from "@/context/auth/action-types";
import UserModel from "@/models/UserModel";


export const checkAuthenticateUser = (api, payload) => {
    return {
        onInit: ({router, pathname}) => {
            const {get} = dataHandler(payload)
            const authToken = get('authToken', localStorage.getItem('auth_token'))

            if (authToken && pathname === '/login') {
                router.push('/dashboard')
                return false
            }

            if (!authToken && pathname !== '/login') {
                router.push('/login')
                return false
            }
        },
        onSend: async () => {
            return await api.get('/check_user')
        },
        onSuccess: async ({result, router}) => {
            router.push('/dashboard')
        },
        onError: async ({exception, router}) => {
            localStorage.removeItem('auth_token')
            router.push('/login')
        },
    }
}

export const getAuthenticateUser = (api, payload) => {
    return {
        onInit: ({ctx}) => {
            const {get} = dataHandler(payload)
            const authToken = get('authToken', localStorage.getItem('auth_token'))
            const {state} = ctx

            if (state?.user) {
                return false
            }

            return !!authToken
        },
        onSend: async () => {
            return await api.get('/user')
        },
        onSuccess: async ({result, router, ctx}) => {
            const {dispatch} = ctx
            dispatch({
                type: SET_USER,
                payload: UserModel(result.user),
            })
        },
        onError: ({exception, router}) => {
            localStorage.removeItem('auth_token')
            router.push('/login')
        }
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
        onSuccess: ({result, router}) => {
            localStorage.setItem('auth_token', result.token)
            router.push('/dashboard')
        },
    }

}