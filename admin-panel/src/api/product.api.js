import api from "./axios";

export const getProduct = async () => {
  const res = await api.get('/api/product')
  console.log(res.data)
}

export const addProduct = (data) => {
  return api.post('/api/product', data)
}