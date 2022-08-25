import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_CLEAR_ERROR
} from './constants'


const initialState = {
    product: {},
    loading: false,
    error: null
}


export const productDetailsReducer = (state = initialState, action) => {

    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case PRODUCT_DETAILS_CLEAR_ERROR:
            return {
                ...state,
                loading: false,
                error: null
            }
        default:
            return state;
    }

}