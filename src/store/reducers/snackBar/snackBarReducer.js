import {CLOSE_SNACK_BAR, OPEN_SNACK_BAR, SET_MESSAGE} from './constants'


const initialState = {
    open: false,
    message: ''
}


export const snackBarReducer = (state = initialState, action) => {

    switch (action.type) {
        case OPEN_SNACK_BAR:
            return {
                ...state,
                open: action.payload
            }
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        case CLOSE_SNACK_BAR:
            return {
                open: false,
                message: ''
            }
        default:
            return state;
    }
}


export const snackBarActions = {
    openSnackBar: (payload) => ({type: OPEN_SNACK_BAR, payload}),
    closeSnackBar: () => ({type: CLOSE_SNACK_BAR}),
    setMessage: (payload) => ({type: SET_MESSAGE, payload}),
}