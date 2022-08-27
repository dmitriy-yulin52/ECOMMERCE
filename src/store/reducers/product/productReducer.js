import {ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL,CLEAR_ERRORS} from './constants'


const initialState = {
    products: [],
    loading: false,
    productsCount:0,
    error:null,
    resultPerPage:0,
}


export const productReducer = (state = initialState, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productsCount:action.payload.productCount,
                resultPerPage:action.payload.resultPerPage,
                filteredProductsCount:action.payload.filteredProductsCount

            }
        case ALL_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}