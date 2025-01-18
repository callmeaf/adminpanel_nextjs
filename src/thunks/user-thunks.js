import paginateModel from "@/models/PaginateModel";
import UserModel from "@/models/UserModel";

export const getUsers = (api, payload) => {
    return {
        onSend: async () => {
            return await api.get('/users')
        },
        onSuccess: ({result, finalData}) => {
            finalData.users = paginateModel(result.users, UserModel)
        }
    }
}