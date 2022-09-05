import instance from "../instance";
import {updateProfile} from "../../store/reducers/user/actions";


export const userApi = {
    login(email, password) {
        return instance.post(`/api/v1/login`, {email, password})
    },
    register(userData){
        return instance.post(`/api/v1/register`,userData)
    },
    loadUser(){
        return instance.get('/api/v1/me')
    },
    logout(){
        return instance.get(`/api/v1/logout`)
    },
    updateProfile(userData){
        return instance.put(`/api/v1/me/update`,userData)
    }
}