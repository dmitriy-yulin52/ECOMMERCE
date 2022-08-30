import instance from "../instance";


export const userApi = {
    login(email, password) {
        return instance.post(`/api/v1/login`, {email, password})
    },
    register(userData){
        return instance.post(`/api/v1/register`,userData)
    }
}