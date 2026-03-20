import axios from "axios";

const baseURL = "/api/admin/"
const API = axios.create({
  baseURL, // example: http://localhost:5000/api
  withCredentials: true, // if using cookies/auth
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log("Authentication failed, redirecting to login...");
      if (typeof window !== 'undefined') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
