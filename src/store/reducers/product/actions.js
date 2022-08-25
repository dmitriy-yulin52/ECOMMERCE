import {ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS} from './constants'
import {productApi} from "../../../api/product/productApi";


export const productActions = {
    getAllProduct,
    clearErrors:()=>(dispatch)=>dispatch({type:CLEAR_ERRORS})
}


function getAllProduct() {
    return async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCT_REQUEST
            })
            const {data} = await productApi.getAllProduct();
            console.log(data)
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload: error.response.data?.message ?? 'Ошибка'
            })
        }
    }
}
