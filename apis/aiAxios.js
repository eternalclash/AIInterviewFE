import axios from "axios";

export const BASE_URL =
  "http://ec2-43-201-191-87.ap-northeast-2.compute.amazonaws.com:8080/";

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
