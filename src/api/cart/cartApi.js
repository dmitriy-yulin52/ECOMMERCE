import instance from "../instance";

export const cartApi = {
    addItemsToCart(id){
        return instance.get(`/product/${id}`)
    },
}