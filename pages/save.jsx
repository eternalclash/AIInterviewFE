import { useEffect, useRef, useState } from "react";
import styles from "@/styles/main.module.css";
import { useRecoilState } from "recoil";
import { saveState } from "@/state/saveState.js"; // Adjust the path according to your project structure
import QuestionList from "@/components/QuestionList";
import NavigationButtons from "@/components/NavigationButtons";
import QuestionAnswerArea from "@/components/QuestionAnswerArea";
import { audioState } from "@/state/audioUrls.js";
import Modal from "@/components/Modal";
import {
  executeSimulations,
  postAnswer,
  postSimulations,
  postSimulationsLog,
} from "@/apis/api";
import { useRouter } from "next/router";
import { BiSave } from "react-icons/bi";
import axios from "axios";

const Save = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState(true);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [takeAnswer, setTakeAnswer] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);
  const [playState, setPlayState] = useRecoilState(saveState);
  const [audState, setAudioState] = useRecoilState(audioState);

  let answered = Array.from({ length: playState.length }, (e, idx) => idx);
  const [answeredIndices, setAnsweredIndices] = useState(answered); // 상태 추가

  console.log(answered);

  function uploadImageToS3(url, file) {
    axios
      .get(url)
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }

  const [url, setUrl] = useState(audState[currentIndex]);
  console.log(uploadImageToS3(audState[currentIndex]));

  const [problemList, setProblemList] = useState(
    playState.map((item) => ({
      question: item.question,
      userAnswer: item.reply,
      correctAnswer: item.answer,
    }))
  );

  console.log(problemList);
  const messagesEndRef = useRef(null);

  const questionItem = playState[currentIndex]; // playState에서 현재 질문 항목 가져오기

  const handleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {}, [answeredIndices]);

  const updateHistory = async () => {
    problemList[currentIndex].userAnswer = userAnswer;
    setAnsweredIndices((prev) => [...prev, currentIndex]);
    console.log(answeredIndices.length);
    setIsLoading(true);
    setDisplayAnswer(false);
    console.log(problemList[currentIndex]);
    let answer = problemList[currentIndex].correctAnswer;
    let question = problemList[currentIndex].question;
    let reply = problemList[currentIndex].userAnswer;
    console.log({ answer, question, reply });
    let response = await executeSimulations({
      answer,
      question,
      reply,
      order: currentIndex,
    });

    console.log(response);
    problemList[currentIndex].correctAnswer = response.data.result.prompt;
    setIsLoading(false);
    if (
      answeredIndices.length > 0 &&
      answeredIndices.length == playState.length - 1 &&
      !popup
    ) {
      setPopup(true);
      setModal(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < playState.length - 1) {
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

  const handleMoveIndex = (index) => {
    setCurrentIndex(index);
    setUserAnswer("");
    setTakeAnswer(false);
    setDisplayAnswer(true);
  };

  const handleRestart = () => {
    setUserAnswer("");
    setTakeAnswer(false);
    setDisplayAnswer(true);
    setAnsweredIndices((prev) => {
      return (prev = prev.filter((idx) => currentIndex != idx));
    });
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

  const handleSaveAnswer = async () => {
    await postSimulationsLog();
    window.alert("저장되었습니다.");
    router.push("/");
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
          <QuestionList
            playState={playState}
            currentIndex={currentIndex}
            answeredIndices={answeredIndices}
            setCurrentIndex={setCurrentIndex}
            handleMoveIndex={handleMoveIndex}
          />
          <audio controls src={url}></audio>
        </div>
      </div>
      <QuestionAnswerArea
        answerHistory={answerHistory}
        displayAnswer={displayAnswer}
        questionItem={questionItem}
        userAnswer={userAnswer}
        currentIndex={currentIndex}
        setUserAnswer={setUserAnswer}
        handleSubmitAnswer={handleSubmitAnswer}
        messagesEndRef={messagesEndRef}
        answeredIndices={answeredIndices}
        problemList={problemList}
        isLoading={isLoading}
        handlePrev={handlePrev}
        handleRestart={handleRestart}
        handleNext={handleNext}
      />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  // Load any server-side dependencies or configurations here
  return {
    props: {},
  };
};

export default Save;
