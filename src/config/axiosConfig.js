import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("accessToken")
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  headers: {
    "Content-Type": "multipart/form-data",
    "x-api-key": import.meta.env.VITE_API_KEY,
    "Authorization": token
  },
});

// response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
