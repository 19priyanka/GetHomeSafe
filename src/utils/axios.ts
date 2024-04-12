import axios, { AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosDefaultConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
    timeout: 30000,
    // baseURL: "http://192.168.1.30:8080",
    baseURL: "https://gw0.gethomesafe.live",
    // baseURL: "https://gw0.gethomesafe.live",
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
