import api from "./axios";

export const getCategory = (props = {}) => {
   return api.get('/api/category', {params: props}) 
}

export const addCategory = (data) => {
   console.log(data)
   return api.post('/api/category/', data) 
}

