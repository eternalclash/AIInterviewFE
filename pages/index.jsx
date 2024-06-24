import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import styles from "@/styles/main.module.css";
import { AiFillCodepenCircle } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { messageState } from "@/state/messages";
import { postPopularity } from "@/apis/aiApi";

const Main = ({ initialData }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [savedMessages, setSavedMessages] = useRecoilState(messageState);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [easeQustions, setEaseQuestions] = useState([]);
  const [{ question, answer }, setMessageState] = useRecoilState(messageState);

  const router = useRouter();

  const fetchData = async (mode) => {
    let data = {
      user_id: localStorage.getItem("userId"),
      model: mode,
      k: 6,
    };

    return await postPopularity(data);
  };

  const handleSelectMessage = (item) => {
    console.log(item);
    setMessageState({
      question: item?.question,
      answer: item?.answer,
      presetQaId: item?.presetQaId,
    });
    router.push("/messages");
  };

  useEffect(() => {
    // const fetchPopularQuestions = async () => {
    //   const response = await fetchData("popularity");
    //   console.log(response.data);
    //   setPopularQuestions(response.data.recommendations);
    // };

    // const fetchEaseQuestions = async () => {
    //   const response = await fetchData("ease");
    //   console.log(response.data);
    //   setEaseQuestions(response.data.recommendations);
    // };

    // fetchEaseQuestions();

    // fetchPopularQuestions();
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.component}>
        <div></div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.4rem",
            width: "95%",
            justifyContent: "flex-start",
            marginBottom: "1vh",
          }}
        >
          <AiFillCodepenCircle size={50} />
          <div style={{ fontSize: "1.8rem" }}>
            필요한 면접질문들을 준비해봤어요!
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "1vw",
            width: "95%",
            justifyContent: "center",
          }}
        >
          {easeQustions?.map((item, index) => (
            <div
              key={index}
              style={{
                width: "100%",
                border: "1px solid",
                borderRadius: "1px",
                padding: "1%",
                fontSize: "1.4rem",
                cursor: "pointer",
              }}
              onClick={() => handleSelectMessage(item)}
            >
              <div>{item.question}</div>
              <div style={{ fontSize: "0.8rem" }}>{item.category}</div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.4rem",
            width: "95%",
            justifyContent: "flex-start",
            marginBottom: "1vh",
            marginTop: "4vh",
          }}
        >
          <AiFillCodepenCircle size={50} />
          <div style={{ fontSize: "1.8rem" }}>
            사용자가 제일 많이 선택한 질문들을 준비해보시는 게 어떠신가요?
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "1vw",
            width: "95%",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {popularQuestions.length > 0 &&
            popularQuestions?.map((item, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  border: "1px solid",
                  borderRadius: "1px",
                  padding: "1%",
                  fontSize: "1.4rem",
                }}
                onClick={() => handleSelectMessage(item)}
              >
                <div>{item.question}</div>
                <div style={{ fontSize: "0.8rem" }}>{item.category}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const initialData = [
    { question: "인덱스란 무엇인가요?", category: "데이터베이스" },
    { question: "트랜잭션이란 무엇인가요?", category: "데이터베이스" },
    { question: "HTTP와 HTTPS의 차이는 무엇인가요?", category: "네트워크" },
    { question: "TCP와 UDP의 차이는 무엇인가요?", category: "네트워크" },
  ];

  return {
    props: {
      initialData,
    },
  };
};

export default Main;
