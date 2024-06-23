import { aiAxiosClient } from "./aiAxios";

export const getIdToken = (param) => {
    return aiAxiosClient.get(`/recommend`);
  };
  
  export const postPopularity = (data) => {
    return aiAxiosClient.post(`/recommend`,  data);
  };

  export const postEase = (data) => {
    return aiAxiosClient.post(`/recommend`,  data);
  };