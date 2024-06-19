import { useEffect, useRef, useState } from "react";
import styles from "@/styles/main.module.css";
import { useRecoilState } from "recoil";
import { playListState } from "@/state/playState.js"; // Adjust the path according to your project structure
import QuestionList from "@/components/QuestionList";
import NavigationButtons from "@/components/NavigationButtons";
import QuestionAnswerArea from "@/components/QuestionAnswerArea";
import Modal from "@/components/Modal";
import { executeSimulations, postAnswer } from "@/apis/api";

const Play = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [displayAnswer, setDisplayAnswer] = useState(true);
  const [answerHistory, setAnswerHistory] = useState([]);
  const [takeAnswer, setTakeAnswer] = useState(false);
  const [answeredIndices, setAnsweredIndices] = useState([]); // 상태 추가

  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const [modal, setModal] = useState(false);
  // const [playState, setPlayState] = useRecoilState(playListState);
  const playState = [
    {
      answer:
        "페이지 교체 알고리즘은 가상 메모리 시스템에서 메모리가 부족할 때 어떤 페이지를 교체할지 결정하는 알고리즘입니다. 여러 가지 페이지 교체 알고리즘이 있지만, 가장 널리 사용되는 알고리즘은 다음과 같습니다.\n\n1. FIFO (First In First Out): 가장 먼저 들어온 페이지를 먼저 교체하는 알고리즘입니다. 가장 단순한 알고리즘으로, 오래된 페이지를 교체하기 때문에 페이지 부재율이 높을 수 있습니다.\n\n2. LRU (Least Recently Used): 최근에 사용되지 않은 페이지를 교체하는 알고리즘입니다. 가장 오랫동안 사용되지 않은 페이지를 교체하여 페이지 부재율을 낮출 수 있습니다.\n\n3. LFU (Least Frequently Used): 가장 적게 사용된 페이지를 교체하는 알고리즘입니다. 자주 사용되지 않는 페이지를 교체하여 페이지 부재율을 줄일 수 있지만, 사용 빈도를 추적하는 데 추가적인 비용이 들 수 있습니다.\n\n4. Optimal: 가장 먼 미래에 사용될 페이지를 교체하는 알고리즘입니다. 이론적으로 최적의 성능을 보장하지만, 실제로는 구현하기 어려운 알고리즘입니다.\n\n이외에도 다양한 페이지 교체 알고리즘이 존재하며, 시스템의 특성에 맞게 적절한 알고리즘을 선택하여 사용해야 합니다. 페이지 교체 알고리즘은 메모리 관리의 핵심이므로 효율적인 알고리즘을 선택하는 것이 중요합니다.",
      question: "페이지 교체 알고리즘",
    },
    {
      answer:
        "페이지 교체 알고리즘은 가상 메모리 시스템에서 메모리가 부족할 때 어떤 페이지를 교체할지 결정하는 알고리즘입니다. 여러 가지 페이지 교체 알고리즘이 있지만, 가장 널리 사용되는 알고리즘은 다음과 같습니다.\n\n1. FIFO (First In First Out): 가장 먼저 들어온 페이지를 먼저 교체하는 알고리즘입니다. 가장 단순한 알고리즘으로, 오래된 페이지를 교체하기 때문에 페이지 부재율이 높을 수 있습니다.\n\n2. LRU (Least Recently Used): 최근에 사용되지 않은 페이지를 교체하는 알고리즘입니다. 가장 오랫동안 사용되지 않은 페이지를 교체하여 페이지 부재율을 낮출 수 있습니다.\n\n3. LFU (Least Frequently Used): 가장 적게 사용된 페이지를 교체하는 알고리즘입니다. 자주 사용되지 않는 페이지를 교체하여 페이지 부재율을 줄일 수 있지만, 사용 빈도를 추적하는 데 추가적인 비용이 들 수 있습니다.\n\n4. Optimal: 가장 먼 미래에 사용될 페이지를 교체하는 알고리즘입니다. 이론적으로 최적의 성능을 보장하지만, 실제로는 구현하기 어려운 알고리즘입니다.\n\n이외에도 다양한 페이지 교체 알고리즘이 존재하며, 시스템의 특성에 맞게 적절한 알고리즘을 선택하여 사용해야 합니다. 페이지 교체 알고리즘은 메모리 관리의 핵심이므로 효율적인 알고리즘을 선택하는 것이 중요합니다.",
      question: "페이지 교체 알고리즘",
    },
  ];

  const [problemList, setProblemList] = useState(
    playState.map((item) => ({
      question: item.question,
      userAnswer: "",
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
    let response = await executeSimulations({ answer, question, reply });

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

  const handleSaveAnswer = () => {
    const data = problemList.map((e, idx) => {
      return {
        answer: problemList[currentIndex].correctAnswer,
        question: problemList[currentIndex].question,
        reply: problemList[currentIndex].userAnswer,
      };
    });
    
  };

  return (
    <div className={styles.main} style={{ alignItems: "center" }}>
      {modal && (
        <Modal>
          <div style={{ zIndex: 10, color: "white" }}>
            모든 문제를 완료하셨습니다!
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
              marginTop: "3vh",
            }}
          >
            <div
              style={{
                width: "30%",
                display: "flex",
                background: "green",
                justifyContent: "center",
                alignItems: "center",
                padding: "2%",
                cursor: "pointer",
              }}
            >
              완료
            </div>
            <div
              style={{
                width: "30%",
                display: "flex",
                background: "gray",
                justifyContent: "center",
                alignItems: "center",
                padding: "2%",
                cursor: "pointer",
              }}
              onClick={handleModal}
            >
              더 연습하기
            </div>
          </div>
        </Modal>
      )}
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
        </div>
        {/* <NavigationButtons
          handlePrev={handlePrev}
          handleRestart={handleRestart}
          handleNext={handleNext}
        /> */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "red",
              width: "50%",
              height: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "1vw",
              cursor: "pointer",
            }}
          >
            나가기
          </div>
          <div
            style={{
              background: "green",
              width: "50%",
              height: "10vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              onClick: handleSaveAnswer,
            }}
          >
            저장하기
          </div>
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

export default Play;
