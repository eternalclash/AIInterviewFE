import axios from "axios";

export const BASE_URL: string = "http://localhost:8080/api/v1/members";

export const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

axiosClient.interceptors.request.use(async (config: any) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken != null && config.headers) {
      console.log("interceptors", await localStorage.getItem("access_token"));
      config.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
    }
    return config;
  } catch {}
});
