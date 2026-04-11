import { api } from "./api";

export const productBySlug = async(slug) => {
  const res = await api.get(`/product/slug/${slug}`)
  return res.data.product
}