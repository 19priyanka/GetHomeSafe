import axios, { AxiosRequestConfig, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const baseUrls = [
  "https://gw0.gethomesafe.live",
  "https://gw1.gethomesafe.live",
  "https://gw2.gethomesafe.live"
];


let currentUrlIndex = 0;
const maxRetries =3;

const axiosDefaultConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
    timeout: 30000,
    // baseURL: "http://192.168.1.30:8080",
    baseURL: baseUrls[currentUrlIndex],
};

const axiosInstance = axios.create(axiosDefaultConfig);

axiosInstance.interceptors.request.use((config) => {
    AsyncStorage.getItem("x-auth-token").then((token) => {
        if (token) {
            config.headers["Authorization"] = token;
        }
    });
    config.baseURL = baseUrls[currentUrlIndex]
    return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const retryCount = error.config.retryCount || 0;
    if (retryCount >= baseUrls.length) {
      return Promise.reject(error);
    }
    currentUrlIndex = (currentUrlIndex + 1) % baseUrls.length;
    error.config.retryCount = retryCount + 1;
    console.log(baseUrls[currentUrlIndex])
    console.log(error)
    if (error.response) {
      if (error.response.status >= 500) {
        return axiosInstance.request({
          ...error.config,
          baseURL: baseUrls[currentUrlIndex],
        });
      }
    } else if (error.request) {
      return axiosInstance.request({
        ...error.config,
        baseURL: baseUrls[currentUrlIndex],
      });
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;
