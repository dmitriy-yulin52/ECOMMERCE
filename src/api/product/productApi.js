import instance from "../instance";


export const productApi = {
    getAllProduct(keyword, currentPage, price, ratings, category) {

        const notCategory = category? `&category=${category}` : '';
        const notRatings = ratings ? `&ratings[gte]=${ratings}` : '';
        const notPrice = price ? `&price[gte]=${price[0]}&price[lte]=${price[1]}` : '';

        return instance.get(`/api/v1/products?keyword=${keyword}&page=${currentPage}${notPrice}${notCategory}${notRatings}`);
    },
    getProductDetails(id) {
        return instance.get(`/api/v1/product/${id}`)
    }
}


