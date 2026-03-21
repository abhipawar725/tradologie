import axios from "axios";
const url = import.meta.env.VITE_BASE_URL

export const api = axios.create({
  baseURL: `${url}/api`,
  withCredentials: true,
});
