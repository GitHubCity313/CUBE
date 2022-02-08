import axios from "axios";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

console.log(publicRuntimeConfig)

const axiosInstance = axios.create({
  baseURL: publicRuntimeConfig.apiUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;