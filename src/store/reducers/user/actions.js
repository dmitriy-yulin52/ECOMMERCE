import {
    CLEAR_ERRORS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
    LOGIN_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS
} from "./constants";
import {userApi} from "../../../api/user/user-api";
import axios from "axios";
import instance from "../../../api/instance";


export const userActions = {
    clearErrors: () => (dispatch) => dispatch({type: CLEAR_ERRORS}),
    login,
    register,
    loadUser,
    logout,
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
            dispatch({type: REGISTER_USER_SUCCESS, payload: data.user});
        } catch (error) {
            dispatch({
                type: REGISTER_USER_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}

function loadUser() {
    return async (dispatch) => {
        try {
            dispatch({type: LOAD_USER_REQUEST});
            const {data} = await axios.get('/api/v1/me')
            dispatch({type: LOAD_USER_SUCCESS, payload: data.user});
        } catch (error) {
            dispatch({type: LOAD_USER_FAIL, payload: error.response.data.message});
        }
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userApi.logout()
            dispatch({type: LOGOUT_SUCCESS});
        } catch (error) {
            dispatch({type: LOGOUT_FAIL, payload: error.response.data.message});
        }
    }
}

export function updateProfile(userData) {
    return async (dispatch) => {
        try {
            dispatch({type: UPDATE_PROFILE_REQUEST});
            const {data} = await userApi.updateProfile(userData)
            dispatch({type: UPDATE_PROFILE_SUCCESS, payload: data.success});
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload: error.response.data.message,
            });
        }
    }
}
