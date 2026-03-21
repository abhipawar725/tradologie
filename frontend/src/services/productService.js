import { api } from "./api"

export const getProducts = () => {
    return api.get('/product')
}

export const getProductBySlug = (slug) => {
    return api.get(`/product/slug/${slug}`)
}