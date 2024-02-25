import axios from "axios";

const axiosInstance = ({ requiresAuth = false } = {}) => {
  const options = {};
  options.baseURL = import.meta.env.VITE_BASE_API_URL;
  // option for auth required
  if (requiresAuth) {
    options.headers.Authorization = "JWT TOKEN";
  }
  const instance = axios.create(options);
  return instance;
};

export default axiosInstance;
