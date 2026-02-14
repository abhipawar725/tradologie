import api from "./axios";

export const getCategory = () => {
   return api.get("/api/category") 
}
