import axios from "axios";

export const BASE_URL: string =
  "http://ec2-13-125-147-142.ap-northeast-2.compute.amazonaws.com:8080/";

export const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
});

axiosClient.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
      if(true) {
      originalRequest._retry = true;
      try {
        // Assuming refreshToken API endpoint
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${BASE_URL}/refresh`, {
          refreshToken,
        });

        if (response.data) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          axiosClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return axiosClient(originalRequest);
        }
      } catch (refreshError) {
        // console.error("Refresh token failed", refreshError);
        // alert("로그인 해주셔야 하는 서비스입니다");
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
