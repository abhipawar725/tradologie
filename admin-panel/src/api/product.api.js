import api from "./axios";

export const getProducts = async () => {
  return api.get('/api/product')
}

export const getProductById = async (id) => {
  return api.get(`/api/product/${id}`)
}

export const addProduct = (data) => {
  return api.post('/api/product', data)
}

export const updateProduct = (id,data) => {
  return api.put(`/api/product/${id}`, data)
}

export const deleteProduct = (id) => {
  return api.delete(`/api/product/${id}`)
}