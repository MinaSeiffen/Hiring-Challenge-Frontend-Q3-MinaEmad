import axios, { AxiosError } from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://api.github.com",
});

AxiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token =
      import.meta.env.VITE_GITHUB_TOKEN || ""; 
            
   if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

AxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    if ([400, 401, 403, 404, 500].includes(status ?? 0)) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
