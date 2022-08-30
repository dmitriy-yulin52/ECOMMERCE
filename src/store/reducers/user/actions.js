import {
    CLEAR_ERRORS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "./constants";
import {userApi} from "../../../api/user/user-api";
import axios from "axios";


export const userActions = {
    clearErrors: () => (dispatch) => dispatch({type: CLEAR_ERRORS}),
    login,
    register,
}


function login(email, password) {
    return async (dispatch) => {
        try {
            dispatch({type: LOGIN_REQUEST});
            const {data} = await userApi.login(email, password)
            dispatch({type: LOGIN_SUCCESS, payload: data.user})
        } catch (e) {
            dispatch({type: LOGIN_FAIL, payload: e.response.data.message})
        }
    }
}

 function register(userData) {
    return async (dispatch) => {
        try {
            dispatch({type: REGISTER_USER_REQUEST});
            const {data} = await axios.post(`/api/v1/register`, userData)
            console.log(data, 'data login')
            dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
        } catch (error) {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}
