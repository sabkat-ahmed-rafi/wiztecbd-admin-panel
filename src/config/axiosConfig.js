import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
  timeout: 10000,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired / not authenticated
      
    }
    return Promise.reject(error);
  }
);

export default api;
