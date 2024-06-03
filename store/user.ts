import React, { useState } from "react";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { login, signup } from "@/apis/api";
import ErrorData from "@/types/error";
import { useRouter } from "next/router";

const useUserStore = () => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorObj, setErrorObj] = useState<ErrorData|null>();
  const router = useRouter();
  console.log(password + ":" + name);
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Success" + data);
    },
    onError: async (error: any) => {
      setError(true);
      setErrorObj(error.response.data);
    },
  });

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log(data.data)

    },

    onError: (error : any ) => {
      setError(true);
      setErrorObj(error.response.data);
    },
  });


  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const signupHandler = async () => {
    try {
      await signupMutation.mutateAsync({ name, password });
      setErrorObj(null);
      router.push("/login");
    } catch (e) {}
  };


  const loginHandler = async () => {

    try{
        await loginMutation.mutateAsync({ name, password });
        setErrorObj(null);
        router.push("/main");
    }
    catch(e) {

    }

  };

  const navigateMain = () => {
    router.push("/login");
  };

  return {
    name,
    nameHandler,
    password,
    passwordHandler,
    signupHandler,
    loginHandler,
    errorObj,
    navigateMain,
  };
};

export default useUserStore;
