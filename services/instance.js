import axios from "axios";
import authService from "./authService";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const axiosInstance = axios.create({
  baseURL: publicRuntimeConfig.apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;