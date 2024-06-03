import SignupData from "@/types/signup";
import axios from "axios";
import { axiosClient } from "./axios";


export const signup = (signupData : SignupData) => {
    return axiosClient.post('/signup',{...signupData});
}


export const login = (signupData: SignupData) =>{
    return axiosClient.post('/signin/password',{...signupData});
}

