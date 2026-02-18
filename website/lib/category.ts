import api from "./api";

export const getCategory = async () => {
  try {
    const res = await api.get("/api/category");
    return res.data.data.categories
  } catch (error: any) {
    console.log(error.response.data.message);
  }
};
