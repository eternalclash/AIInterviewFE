import { useState, useEffect, useRef } from "react";
import useUserStore from "@/store/user";
import { GetServerSideProps } from "next";
import styles from "@/styles/main.module.css";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { AiFillCodepenCircle } from "react-icons/ai";
import { useRouter } from "next/router";
import { getPresets } from "@/apis/api";
const Login = () => {
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
  const kakaoLoginUrl =
    "https://kauth.kakao.com/oauth/authorize?client_id=03072686150feaab2501e63e2183ff64&response_type=code&redirect_uri=http://ec2-13-125-147-142.ap-northeast-2.compute.amazonaws.com:8080/kakao/id-token";
  const redirectToKakaoOAuth = () => {
    window.location.href = kakaoLoginUrl;

    
  };

  const loginWithKakao = async () => {
    // 카카오 로그인 요청
    window.Kakao.Auth.login({
      success: function (authObj) {
        // 로그인 성공 시 토큰 정보 출력 및 사용자 정보 요청
        console.log(authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            const kakaoAccount = res.kakao_account;
            console.log(kakaoAccount);

            // router.push("/main"); // 로그인 성공 후 리다이렉트
          },
          fail: function (error) {
            console.error(error);
          },
        });
      },
      fail: function (err) {
        console.error(err);
      },
    });
    const response = await getPresets();
    console.log(response.data.result);
  };
  const {
    name,
    password,
    errorObj,
    nameHandler,
    passwordHandler,
    loginHandler,
    navigateMain,
  } = useUserStore();
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const router = useRouter();
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

export const getServerSideProp = async (ctx) => {
  return {
    props: {},
  };
};

export default Login;
