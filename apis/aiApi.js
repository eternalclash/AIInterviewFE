import { aiAxiosClient } from "./aiAxios";

export const getIdToken = (param) => {
    return aiAxiosClient.get(`/recommend`);
  };
  
  export const postIdToken = (idToken) => {
    return aiAxiosClient.post(`/recommend`, { idToken });
  };