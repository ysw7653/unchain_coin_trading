import axios from "axios";

const host = "http://localhost";
const port = 27017;

const axiosInstance = axios.create({
  baseURL: `${host}:${port}`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
