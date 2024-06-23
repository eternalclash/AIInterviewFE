import React, { useState, useEffect, useRef } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { GrUploadOption } from "react-icons/gr";
import { MdKeyboardVoice } from "react-icons/md";
import styles from "@/styles/main.module.css";
import Speech from "@/pages/speech";
import { ClockLoader } from "react-spinners";
import NavigationButtons from "./NavigationButtons";

const QuestionAnswerArea = ({
  answerHistory,
  displayAnswer,
  questionItem,
  userAnswer,
  setUserAnswer,
  handleSubmitAnswer,
  answeredIndices,
  currentIndex,
  problemList,
  isLoading,
  handlePrev,
  handleRestart,
  handleNext,
}) => {
  const [isVoice, setIsVoice] = useState(false);
  const messagesEndRef = useRef(null);
  const handleToggleMode = () => {
    setIsVoice(!isVoice);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [answerHistory]);

  console.log(questionItem);
  if (answeredIndices.includes(currentIndex)) {
    return (
      <div
        style={{
          width: "50%",
          border: "1px solid var(--gray-400)",
          height: "80vh",
          borderRadius: "1%",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "70vh",
            width: "100%",
            overflowY: "scroll",
            position: "relative",
          }}
          className="hideScrollbar"
        >
          <div ref={messagesEndRef} style={{ marginLeft: "1vw" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1vh 0",
              }}
            >
              <FaRegQuestionCircle size={30} style={{ marginRight: "0.5vw" }} />
              <div>질문</div>
            </div>
            <div className={styles.ml4}>{questionItem?.question}</div>
          </div>
          {problemList[currentIndex].userAnswer && (
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginRight: "1vw",
                height: "40h",
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
              <div
                contentEditable={false}
                style={{ marginRight: "1vw" }}
                className={styles.ml2}
              >
                {problemList[currentIndex].userAnswer}
              </div>
            </div>
          )}
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginRight: "1vw",
              height: "40h",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                marginRight: "1vw",
                height: "40h",
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
                <div>AI 답변</div>
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
                  value={problemList[currentIndex].correctAnswer}
                />
              )}
            </div>
          </div>
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
          <NavigationButtons
            handlePrev={handlePrev}
            handleRestart={handleRestart}
            handleNext={handleNext}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "50%",
        border: "1px solid var(--gray-400)",
        height: "80vh",
        borderRadius: "1%",
        position: "relative",
      }}
    >
      <div
        style={{
          height: "70vh",
          width: "100%",
          overflowY: "scroll",
          position: "relative",
        }}
        className="hideScrollbar"
      >
        {displayAnswer && questionItem && (
          <div ref={messagesEndRef} style={{ marginLeft: "1vw" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1vh 0",
              }}
            >
              <FaRegQuestionCircle size={30} style={{ marginRight: "0.5vw" }} />
              <div>질문</div>
            </div>
            <div className={styles.ml4}>{questionItem?.question}</div>
          </div>
        )}
        <div></div>
        {isVoice ? (
          <div
            style={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              cursor: "pointer",
            }}
            onClick={handleToggleMode}
          >
            음성으로 시작하기
          </div>
        ) : (
          <div
            style={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              cursor: "pointer",
            }}
            onClick={handleToggleMode}
          >
            텍스트로 시작하기
          </div>
        )}
      </div>

      {isVoice ? (
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
            placeholder="답변해주세요"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className={styles.ml3}
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
      ) : (
        <Speech
          userAnswer={userAnswer}
          setUserAnswer={setUserAnswer}
          handleSubmitAnswer={handleSubmitAnswer}
          currentIndex={currentIndex}
        />
      )}
    </div>
  );
};

export default QuestionAnswerArea;
