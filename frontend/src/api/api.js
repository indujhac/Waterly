import axios from "axios";
import { getTokens, saveTokens } from "../utils/tokenStorage";
const API_URL = "http://10.13.107.125:5000/api";
const api = axios.create({
  baseURL: API_URL,
});

export const getNewTokens = async (refreshToken) => {
  const response = await api.post("/auth/refresh", { refreshToken });
  return response.data;
};

api.interceptors.request.use(async (config) => {
  const { accessToken } = await getTokens();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.config.url !== "/auth/refresh" &&
      error.config.url !== "/auth/login" &&
      !error.config._retry
    ) {
      error.config._retry = true;

      const { refreshToken } = await getTokens();

      if (refreshToken) {
        const data = await getNewTokens(refreshToken);

        await saveTokens(data.accessToken, data.refreshToken);

        return api(error.config);
      }
    }

    return Promise.reject(error);
  },
);

export const healthCheck = async () => {
  const response = await api.get("/health");
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
