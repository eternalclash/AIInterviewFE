import { useState, useEffect, useRef } from "react";
import { GetServerSideProps } from "next";
import styles from "@/styles/main.module.css";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AiFillCodepenCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { getIdToken, getPresets, postLogin } from "@/apis/api";
import { useRecoilState } from "recoil";
import { loginState } from "@/state/loginState";

const Login = () => {
  const router = useRouter();
  const [loginText, setLoginText] = useRecoilState(loginState);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          // 초기화: 여기서 REST API 키를 사용합니다
          window.Kakao.init("e550eef54bb11cd1ce58201a0df5c279");
        }
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const { code } = router.query;
    if (code) {
      console.log("Received code:", code);
      handleLogin(code);
    }
  }, [router]);

  // Kakao 로그인 페이지로 리다이렉트
  const redirectToKakaoOAuth = () => {
    const currentUrl = window.location.origin;
    const kakaoLoginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=03072686150feaab2501e63e2183ff64&response_type=code&redirect_uri=${currentUrl}/login`;
    window.location.href = kakaoLoginUrl;
  };

  // code를 사용하여 로그인
  const handleLogin = async (code) => {
    try {
      const idToken = await getIdToken(code);
      const response = await postLogin({
        idToken: idToken.data.result.idToken,
      });
      console.log(response.data);
      localStorage.setItem("refreshToken", response.data.result.refreshToken);
      localStorage.setItem("accessToken", response.data.result.accessToken);
      localStorage.setItem("userId", response.data.result.loginMemberId);
      window.alert("로그인 되었습니다!");
      setLoginText("로그아웃");

      router.push("/");
      // 로그인 후 리다이렉트 등의 추가 로직
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
    }
  };

  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  const texts = [
    "샤딩이 무엇인지 설명해주실 수 있으실까요?",
    "HTTP에 대해 설명해주세요.",
    "멀티스레드의 장단점은 무엇인가요?",
  ];
  const typingDelay = 100;
  const nextTextDelay = 2000; // 다음 텍스트로 넘어가기 전 지연 시간(ms)
  const refIndex = useRef(index);

  useEffect(() => {
    refIndex.current = index;
  }, [index]);

  const typeNextChar = (charIndex) => {
    if (charIndex < texts[index].length) {
      setDisplayText((prev) => prev + texts[index].charAt(charIndex));
      setTimeout(() => typeNextChar(charIndex + 1), typingDelay);
    } else {
      // 현재 텍스트 타이핑이 끝나면 다음 텍스트로 넘어간다
      setTimeout(() => {
        setDisplayText("");
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }, nextTextDelay);
    }
  };

  useEffect(() => {
    if (texts.length > 0) {
      setDisplayText("");
      typeNextChar(0);
    }
  }, [index]); // index가 바뀔 때마다 텍스트를 다시 타이핑 시작

  return (
    <div className={styles.login}>
      <div className={styles.loginFont}>&quot;{displayText}&quot;</div>
      <div className={styles.loginFont}> 에 대한 면접질문을 대비해보세요.</div>
      <div style={{ display: "flex", alignItems: "center", marginTop: "3vh" }}>
        <div
          style={{
            marginRight: "1vw",
            height: "5vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AiFillCodepenCircle size={40} />
          <div style={{ paddingTop: "1%", marginRight: "0.5vw" }}>
            당신을 위한 AI + INTERVIEW
          </div>
        </div>
        <a />
        <img
          src="/카카오톡.png"
          alt="카카오톡 로고"
          className={styles.kakao}
          style={{ cursor: "pointer" }}
          onClick={redirectToKakaoOAuth}
        />
      </div>
      <div
        style={{
          marginTop: "3vh",
          color: "var(--gray-400)",
          fontSize: "0.8rem",
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        돌아가기
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Login;
