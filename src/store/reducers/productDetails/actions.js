import {productApi} from "../../../api/product/productApi";
import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_CLEAR_ERROR
} from './constants'

export const productDetailsActions = {
    getProductDetails,
    clearError: () => ({type: PRODUCT_DETAILS_CLEAR_ERROR})
}

function getProductDetails(id) {
    return async (dispatch) => {
        try {
            dispatch({
                type: PRODUCT_DETAILS_REQUEST
            })
            const {data} = await productApi.getProductDetails(id);
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data.product
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL,
                payload: error.response.data?.message ?? 'Ошибка'
            })
        }
    }
}
