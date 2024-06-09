import axios from "axios";

export const BASE_URL: string =
  // "http://localhost:8080"
  "http://ec2-13-125-147-142.ap-northeast-2.compute.amazonaws.com:8080/";
  
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
    // if (accessToken != null && config.headers) {
    //   console.log("interceptors", await localStorage.getItem("access_token"));
    //   config.headers["Authorization"] = `Bearer ${JSON.parse(accessToken)}`;
    // }
    config.headers[
      "Authorization"
    ] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhaS1pbnRlcnZpZXctc2ltdWxhdG9yIiwic3ViIjoiNWI0ZDk2NzAtZjA1NS00YjljLTg2YjEtMWZhMGU1MWFiOGJkIiwiaWF0IjoxNzE3ODYwNjE4LCJleHAiOjg2NDAxNzE3ODYwNjE4LCJ0eXBlIjoiYWNjZXNzVG9rZW4iLCJyb2xlIjoi7J2867CYIOycoOyggCJ9.uz_QsR4nM3EH5PqqA7L6sviqA3wijMy7D5QRkcfa4j0`;
    return config;
  } catch {}
});
