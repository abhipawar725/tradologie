import api from "./axios";

export const getCategory = (page, limit) => {
   return api.get(`/api/category?page=${page}&limit=${limit}`) 
}
