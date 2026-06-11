import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("token")}`,
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    
      if (error.response && error.response.status === 401) {

      localStorage.clear();
      
      
    }
    return Promise.reject(error);
  }
);

export default api;
