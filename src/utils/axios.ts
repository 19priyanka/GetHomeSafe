import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosDefaultConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
    timeout: 30000,
    baseURL: "http://10.13.189.118:8080",
};

const axiosInstance = axios.create(axiosDefaultConfig);

axiosInstance.interceptors.request.use((config) => {
    AsyncStorage.getItem("x-auth-token").then((token) => {
        if (token) {
            config.headers["Authorization"] = token;
        }
    });

    return config;
});

export default axiosInstance;
