import { api } from "./api"

export const getCategory = async() => {
   const res = await api.get("/category")
   return res?.data?.data?.categories
}