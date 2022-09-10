import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO,} from "./constants";
import {cartApi} from "../../../api/cart/cartApi";


export const cartActions = {
    addItemsToCart,
    saveShippingInfo,
    removeItemsFromCart,

}


function addItemsToCart(id, quantity) {
    return async (dispatch, getState) => {
        const {data} = await cartApi.addItemsToCart(id);
        dispatch({
            type: ADD_TO_CART,
            payload: {
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.Stock,
                quantity,
            },
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
}

function removeItemsFromCart(id) {
    return async (dispatch, getState) => {
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id,
        });
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
}

function saveShippingInfo(data) {
    return async (dispatch) => {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data,
        });

        localStorage.setItem("shippingInfo", JSON.stringify(data));
    }
}