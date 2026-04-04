import api from "./axios";

export const getCategory = async ({queryKey}) => {
  const [_key, page, limit] = queryKey
  const res = await api.get("/api/category", { params: {page, limit} });
  if(res.status !== 200) throw new Error("Failed to fetch category")

  return res.data;  
};

export const getCategoryById = (id) => {
  return api.get(`/api/category/${id}`);
};

export const addCategory = (data) => {
  return api.post("/api/category/", data);
};

export const editCategory = (id, data) => {
  return api.put(`/api/category/${id}`, data);
};

export const deleteCategory = (id) => {
  return api.delete(`/api/category/${id}`);
};
