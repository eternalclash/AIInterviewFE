import { useEffect, useRef, useState } from "react";
import { GetServerSideProps } from "next";
import styles from "@/styles/main.module.css";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaHistory,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { GrUploadOption } from "react-icons/gr";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { LIST_LIST } from "@/utils/constants.js";

const Play = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState(true);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [takeAnswer, setTakeAnswer] = useState(false);
  const [answeredIndices, setAnsweredIndices] = useState([]); // 상태 추가
  const messagesEndRef = useRef(null);

  const questionItem = LIST_LIST[currentIndex];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [displayAnswer, answerHistory]);

  const updateHistory = () => {
    setAnswerHistory((prev) => [
      ...prev,
      {
        question: questionItem.question,
        userAnswer,
        correctAnswer: questionItem.answer,
      },
    ]);
    setAnsweredIndices((prev) => [...prev, currentIndex]);
    setDisplayAnswer(false);
  };
  const handleNext = () => {
    if (currentIndex < LIST_LIST.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer("");
      setTakeAnswer(false);
      setDisplayAnswer(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer("");
      setTakeAnswer(false);
      setDisplayAnswer(true);
    }
  };

  const handleRestart = () => {
    setUserAnswer("");
    setTakeAnswer(false);
    setDisplayAnswer(true);
  };

  const handleSubmitAnswer = () => {
    if (!takeAnswer) {
      updateHistory();
      setUserAnswer("");
      setDisplayAnswer(false);
      setTakeAnswer(true);
    } else {
      window.alert("질문을 다시 선택해주세요!");
    }
  };

  return (
    <div className={styles.main} style={{ alignItems: "center" }}>
      <div style={{ width: "35%", height: "80vh", marginRight: "2vw" }}>
        <div style={{ height: "70vh", width: "100%" }}>
          {/* 문제 리스트 표시 */}
          <div
            style={{
              height: "7vh",
              background: "black",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.5rem",
              borderRadius: "2%",
            }}
          >
            문제리스트
          </div>
          <div style={{ height: "63vh", overflowY: "scroll" }}>
            {LIST_LIST.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setUserAnswer("");
                  setDisplayAnswer(true);
                  setTakeAnswer(false);
                  scrollToBottom();
                }}
                style={{
                  height: "7vh",
                  background: answeredIndices.includes(index)
                    ? "red"
                    : currentIndex === index
                    ? "gray"
                    : "black",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.5rem",
                  paddingLeft: "2%",
                  border: "1px solid white",
                  cursor: "pointer",
                }}
              >
                <MdOutlineFormatListBulleted
                  style={{ marginRight: "0.5vw", paddingBottom: "0.5vh" }}
                />
                {`${index + 1}번 질문`}
              </div>
            ))}
          </div>
        </div>
        {/* 네비게이션 버튼 */}
        <div
          style={{
            height: "10vh",
            width: "100%",
            marginTop: "2vh",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            onClick={handlePrev}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            <FaArrowCircleLeft size={40} style={{ marginBottom: "0.5vh" }} />
            이전
          </div>
          <div
            onClick={handleRestart}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            <FaHistory size={40} style={{ marginBottom: "0.5vh" }} />
            재실행
          </div>
          <div
            onClick={handleNext}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: "0.8rem",
              cursor: "pointer",
            }}
          >
            <FaArrowCircleRight size={40} style={{ marginBottom: "0.5vh" }} />
            다음
          </div>
        </div>
      </div>
      {/* 질문 및 답변 영역 */}
      <div
        style={{
          width: "50%",
          border: "1px solid var(--gray-400)",
          height: "80vh",
          borderRadius: "1%",
        }}
      >
        <div
          style={{ height: "70vh", width: "100%", overflowY: "scroll" }}
          className={styles.hideScrollbar}
        >
          {answerHistory.map((item, index) => (
            <div key={index}>
              <div style={{ marginLeft: "1vw" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "1vh 0",
                  }}
                >
                  <FaRegQuestionCircle
                    size={30}
                    style={{ marginRight: "0.5vw" }}
                  />
                  <div>질문</div>
                </div>
                <textarea
                  className={styles.ml2}
                  readOnly
                  value={item.question}
                  onChange={(e) => setUserAnswer(e.target.value)}
                />
              </div>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginRight: "1vw",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "1vh 0",
                    width: "80%",
                    marginRight: "1vw",
                  }}
                >
                  <RiQuestionAnswerFill
                    size={30}
                    style={{ marginRight: "0.5vw" }}
                  />
                  <div>질문 답변</div>
                </div>
                <textarea
                  className={styles.ml}
                  style={{ marginRight: "1vw" }}
                  readOnly
                  value={item.userAnswer}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  marginRight: "1vw",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "1vh 0",
                    width: "80%",
                    marginRight: "1vw",
                  }}
                >
                  <RiQuestionAnswerFill
                    size={30}
                    style={{ marginRight: "0.5vw" }}
                  />
                  <div>질문 정답</div>
                </div>
                <textarea
                  className={styles.ml}
                  style={{ marginRight: "1vw" }}
                  readOnly
                  value={item.correctAnswer}
                />
              </div>
            </div>
          ))}
          <div ref={messagesEndRef}></div>
          {displayAnswer && (
            <div style={{ marginLeft: "1vw" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1vh 0",
                }}
              >
                <FaRegQuestionCircle
                  size={30}
                  style={{ marginRight: "0.5vw" }}
                />
                <div>질문</div>
              </div>
              <textarea
                className={styles.ml2}
                readOnly
                value={questionItem.question}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </div>
          )}
        </div>
        <div
          style={{
            height: "10vh",
            width: "100%",
            borderTop: "1px solid var(--gray-400)",
            borderRadius: "1%",
            display: "flex",
          }}
        >
          <textarea
            className={styles.ml3}
            placeholder="답변해주세요"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
          />
          <div
            onClick={handleSubmitAnswer}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "8%",
              cursor: "pointer",
            }}
          >
            <GrUploadOption size={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // Load any server-side dependencies or configurations here
  return {
    props: {},
  };
};

export default Play;
