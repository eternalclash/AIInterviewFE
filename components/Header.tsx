import { GetServerSideProps } from "next";
import styles from "@/styles/header.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { loginState } from "@/state/loginState.js";

const Header = () => {
  const router = useRouter();
  const [login, setLogin] = useRecoilState(loginState);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
      setLogin("로그아웃");
    } else {
      setLogin("로그인");
    }
  }, []);

  const handleLogin = () => {
    if (login == "로그아웃") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.alert("로그아웃 되셨습니다")
      setLogin("로그인");
      router.push("/");
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className={styles.header}
      onClick={() => handleLogin()}
      style={{ cursor: "pointer", padding: "1.5%" }}
    >
      {login}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Header;
