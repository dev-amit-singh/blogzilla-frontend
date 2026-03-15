import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_BACK_URL + "/api/admin/"}`
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
    console.error(
      error.response?.data?.message || error.message
    );
    return Promise.reject(error);
  }
);

export default API;
