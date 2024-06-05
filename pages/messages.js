// pages/messages/[id].js
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { messageState } from "@/state/messages";
import { GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import styles from "@/styles/main.module.css";
import { AiFillCodepenCircle } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { MdUpload } from "react-icons/md";
import { FaRegUserCircle, FaRegQuestionCircle } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { RiQuestionAnswerFill } from "react-icons/ri";
import Side from "@/components/Side";
const Messages = () => {
  const router = useRouter();

  const [messages, setMessages] = useRecoilState(messageState);
  const [question, setQuestion] = useState(messages.question);
  const [answer, setAnswer] = useState(messages.answer);

  useEffect(() => {
    setQuestion(messages.question);
    setAnswer(messages.answer);
  }, [messages]);
  // 이벤트 핸들러: 문제(question) 텍스트 변경
  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  // 이벤트 핸들러: 답변(answer) 텍스트 변경
  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  // 변경된 값으로 Recoil 상태 업데이트
  const handleSave = () => {
    setMessages({
      ...messages,
      question: question,
      answer: answer,
    });
  };
  const handleResize = (event) => {
    const element = event.target;
    element.style.height = "auto";
    element.style.height = element.scrollHeight + "px";
  };
  const [savedMessages, setSavedMessages] = useRecoilState(messageState);
  return (
    <div className={styles.main}>
      <div className={styles.component}>
        <div></div>
        <div className={styles.center}>
          <div className={styles.chat}>
            <div style={{ display: "flex", width: "90%", marginBottom: "1%" }}>
              <FaRegQuestionCircle size={50} />
            </div>

            <textarea
              className={styles.ml}
              value={question}
              onChange={(e) => {
                handleResize(e);
                handleQuestionChange(e);
              }}
            />
          </div>
          <div className={styles.chat} style={{ marginTop: "10vh" }}>
            <div
              style={{
                display: "flex",
                width: "90%",
                marginBottom: "1%",
                justifyContent: "flex-end",
              }}
            >
              <RiQuestionAnswerFill size={50} />
            </div>

            <textarea
              className={styles.ml2}
              value={answer}
              onChange={(e) => {
                handleResize(e);
                handleAnswerChange(e);
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                border: "1px solid var(--gray-400)",
                padding: "1%",
                borderRadius: "1%",
                marginRight: "1vw",
                display: "flex",
                alignItems: "center",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
            >
              AI 답변생성
            </div>
            <div
              style={{
                background: "white",
                color: "black",
                padding: "1%",
                borderRadius: "1%",
                display: "flex",
                alignItems: "center",
                fontSize: "0.9rem",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              면접리스트 등록
            </div>
          </div>
        </div>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};

export default Messages;
