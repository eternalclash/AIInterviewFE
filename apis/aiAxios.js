import axios from "axios";

export const BASE_URL = "https://ml.ssabang.site/";

export const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const aiAxiosClient = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

aiAxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    return Promise.reject(error);
  }
);
