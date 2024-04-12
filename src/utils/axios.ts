import axios, { AxiosRequestConfig, AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";


const baseUrls = [
  "https://gw1.gethomesafe.live",
  "https://gw2.gethomesafe.live",
  "https://gw3.gethomesafe.live"
];


let currentUrlIndex = 0;
const maxRetries =3;

const axiosDefaultConfig: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
    timeout: 30000,

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
  response => response, 
  async (error: AxiosError) => {
    const originalRequest = error.config;
    originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;
    if (error.response && originalRequest._retryCount <= maxRetries){
     
      currentUrlIndex = (currentUrlIndex + 1) % baseUrls.length; 
      originalRequest.baseURL = baseUrls[currentUrlIndex]; 
      return axiosInstance(originalRequest); 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
