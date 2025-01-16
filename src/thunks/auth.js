import dataHandler from "@/utils/data-handler";

export const loginViaMobilePassword = async (api, payload) => {
    const {get} = dataHandler(payload)

    const formData = new FormData()
    formData.append('mobile', get('mobile'))
    formData.append('password', get('password'))

    return await api.post('/login_via_mobile', formData)
}