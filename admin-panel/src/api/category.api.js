import api from "./axios";

export const getCategory = (props = {}) => {
  return api.get("/api/category", { params: props });
};

export const getCategoryById = (id) => {
  return api.get(`/api/category/${id}`);
};

export const addCategory = (data) => {
  console.log(data);
  return api.post("/api/category/", data);
};

export const editCategory = (id, data) => {
  console.log(data);
  return api.put(`/api/category/${id}`, data);
};

export const deleteCategory = (id) => {
  return api.delete(`/api/category/${id}`);
};
