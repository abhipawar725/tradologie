import { api } from "./api";

export const getCategory = () => {
    return api.get('/category')
}

export const getCategoryBySlug = (slug) => {
    return api.get(`/category/slug/${slug}`)
}