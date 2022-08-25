import instance from "../instance";


export const productApi = {
    getAllProduct(){
        return instance.get('/api/v1/products')
    },
    getProductDetails(id){
        return instance.get(`/api/v1/product/${id}`)
    }
}


