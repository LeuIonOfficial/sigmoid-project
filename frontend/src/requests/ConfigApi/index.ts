import axios from "axios";
import { storageKeyAccessToken } from "../Authentication";

const $api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(storageKeyAccessToken);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Export the api instance
export default $api;
