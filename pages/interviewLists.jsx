// pages/messages/[id].js
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { messageState } from "@/state/messages";

import { useState, useEffect } from "react";
import styles from "@/styles/main.module.css";
import { AiFillCodepenCircle } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { MdUpload } from "react-icons/md";
import { FaRegUserCircle, FaRegQuestionCircle } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { RiQuestionAnswerFill } from "react-icons/ri";
import Side from "@/components/Side";
import {
  getPresets,
  postAnswer,
  postInterviews,
  getInterviews,
  putInterviews,
  deleteInterviews,
} from "@/apis/api";
import { ClockLoader } from "react-spinners";
import { sidebarState } from "@/state/sidebarState.js";
import {
  LIST_LIST,
  PLAY_LIST,
  PRESET_LIST,
  SIDE_TYPE,
} from "@/utils/constants.js";
const InterviewLists = () => {
  const router = useRouter();
  const [{ clicked, list }, setSidebar] = useRecoilState(sidebarState);
  const [messages, setMessages] = useRecoilState(messageState);
  const [question, setQuestion] = useState(messages.question);
  const [answer, setAnswer] = useState(messages.answer);
  const [id, setId] = useState(messages?.id);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setQuestion(messages.question);
    setAnswer(messages.answer);
    setId(messages.id);
  }, [messages]);
  console.log(id);
  // 이벤트 핸들러: 문제(question) 텍스트 변경
  const handleQuestionChange = (event) => {
    if (isLoading) return; // 로딩 중에는 동작하지 않음
    setQuestion(event.target.value);
  };

  const handleAnswerChange = async (event) => {
    if (isLoading) return; // 로딩 중에는 동작하지 않음
    setAnswer(event.target.value);
  };

  const handleSave = async () => {
    if (isLoading) return; // 로딩 중에는 동작하지 않음
    const data = {
      question,
      answer,
    };

    try {
      await putInterviews(id, data);
      window.alert("면접리스트 수정완료");
      let dataResponse = await getInterviews();
      console.log("수정완료" + dataResponse.data.result);
      setSidebar({
        list: dataResponse?.data.result,
        clicked: SIDE_TYPE.LIST,
      });
    } catch {}
  };

  const handleDelete = async () => {
    if (isLoading) return; // 로딩 중에는 동작하지 않음

    try {
      await deleteInterviews(id);
      window.alert("면접리스트 삭제완료");
      let dataResponse = await getInterviews();
      setSidebar({
        list: dataResponse?.data.result,
        clicked: SIDE_TYPE.LIST,
      });
      router.push("/");
    } catch {}
  };

  const handlePostAnswer = async () => {
    if (isLoading) return;
    setLoading(true); // 로딩 상태 시작
    try {
      const response = await postAnswer(question);
      setAnswer(response.data.result.answer); // 응답 받은 답변으로 상태 업데이트
    } catch (error) {
      console.error("Error posting answer:", error);
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
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

            {isLoading ? (
              <div
                className={styles.ml2}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <ClockLoader size={100} color="white" />
                <div style={{ marginTop: "1vh" }}>
                  AI 답변을 생성중입니다...
                </div>
              </div>
            ) : (
              <textarea
                className={styles.ml2}
                value={answer}
                onChange={handleAnswerChange}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "space-between",
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
                backgroundColor: "red",
                justifyContent: "center",
                width: "8vw",
              }}
              onClick={() => handleDelete()}
            >
              삭제
            </div>
            <div style={{ display: "flex" }}>
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
                  justifyContent: "center",
                  width: "8vw",
                }}
                onClick={() => handlePostAnswer()}
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
                  justifyContent: "center",
                  width: "8vw",
                }}
                onClick={handleSave}
              >
                수정
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};

export default InterviewLists;
