import {productApi} from "../../../api/product/productApi";
import {PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL} from './constants'

export const productDetailsActions = {
getProductDetails
}

function getProductDetails(id) {
    return async (dispatch) => {
        try {
            dispatch({
                type: PRODUCT_DETAILS_REQUEST
            })
            const {data} = await productApi.getProductDetails(id);
            console.log(data)
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAIL ,
                payload: error.response.data?.message ?? 'Ошибка'
            })
        }
    }
}
