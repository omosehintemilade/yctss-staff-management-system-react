import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Axios configurations
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      alert(error.response.data.message);
      window.location.replace("/login");
    }

    // If request was aborted by Axios
    if (error.code == "ECONNABORTED") {
      error.response = {
        data: { data: { message: "Sorry! An Error Occured", status: "failed" } }
      };
    }

    return Promise.reject(error.response.data);
  }
);
