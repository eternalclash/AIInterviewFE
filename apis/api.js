import SignupData from "@/types/signup";
import axios from "axios";
import { axiosClient } from "./axios";

const kakaoClient = axios.create({
  baseURL:
    "https://kauth.kakao.com/oauth/authorize?client_id=03072686150feaab2501e63e2183ff64&response_type=code&redirect_uri=http://ec2-13-125-147-142.ap-northeast-2.compute.amazonaws.com:8080/kakao/id-token",
});

export const postLogin = (data) => {
  return axiosClient.post("/kakao/login", data);
};

export const getIdToken = (param) => {
  return axiosClient.get(`/kakao/id-token?code=${param}`);
};

export const postIdToken = (idToken) => {
  return axiosClient.post(`/kakao/login`, { idToken });
};

export const getPing = () => {
  return axiosClient.get("/ping");
};

export const getPresets = () => {
  return axiosClient.get("/presets");
};

export const postAnswer = (question) => {
  return axiosClient.post("/interviews/answer", { question });
};

export const getAPI = () => {
  return kakaoClient.get();
};

export const executeSimulations = (data) => {
  return axiosClient.post("/simulations/execute",data)
}

export const getSimulations = () => {
  return axiosClient.get("/simulations").then((response)=>response.data.result);
};

export const getSimulation = () =>{
  return axiosClient.get("/simulations");
}

export const deleteSimulations = (id) => {
  return axiosClient.delete(`/simulations/${id}`);
};

export const postSimulations = (data) => {
  return axiosClient.post("/simulations", data);
};
export const postSimulationsLog = () => {
  return axiosClient.post("/simulations/log");
};

export const getSimulationsLog = () => {
  return axiosClient.get("/simulations/log");
};

export const getInterviews = () => {
  return axiosClient.get("/interviews");
};

export const postInterviews = (data) => {
  return axiosClient.post("/interviews", data);
};

export const deleteInterviews = (id) => {
  return axiosClient.delete(`/interviews/${id}`);
};

export const putInterviews = (id, data) => {
  return axiosClient.put(`/interviews/${id}`, data);
};
