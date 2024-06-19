import React, { useState, useRef, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styles from "@/styles/main.module.css";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";

const Speech = ({ userAnswer, setUserAnswer, handleSubmitAnswer }) => {
  const [lang, setLang] = useState("en-AU");
  const [value, setValue] = useState("");
  const [blocked, setBlocked] = useState(false);
  const [total, setTotal] = useState(""); // 누적된 텍스트를 저장하는 상태
  const timeoutRef = useRef(null);

  const languageOptions = [
    { label: "Cambodian", value: "km-KH" },
    { label: "Deutsch", value: "de-DE" },
    { label: "English", value: "en-AU" },
    { label: "Farsi", value: "fa-IR" },
    { label: "Français", value: "fr-FR" },
    { label: "Italiano", value: "it-IT" },
    { label: "普通话 (中国大陆) - Mandarin", value: "zh" },
    { label: "Portuguese", value: "pt-BR" },
    { label: "Español", value: "es-MX" },
    { label: "Svenska - Swedish", value: "sv-SE" },
  ];

  const handleStop = () => {
    handleSubmitAnswer();
    toggle();
  };

  const onEnd = () => {
    // You could do something here after listening has finished
  };

  const onResult = (result) => {
    console.log(result);
    setValue(result);
  };

  const changeLang = (event) => {
    setLang(event.target.value);
  };

  const onError = (event) => {
    if (event.error === "not-allowed") {
      setBlocked(true);
    }
  };

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = listening
    ? stop
    : () => {
        setBlocked(false);
        listen();
      };

  useEffect(() => {
    if (value) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setUserAnswer((prevTotal) => prevTotal + " " + value);
        setValue(""); // value를 초기화하여 중복 방지
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value]);

  return (
    <div
      style={{
        height: "10vh",
        width: "100%",
        borderTop: "1px solid var(--gray-400)",
        borderRadius: "1%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--gray-400)",
      }}
    >
      {!listening && (
        <MdKeyboardVoice
          disabled={blocked}
          type="button"
          onClick={toggle}
          size={40}
          style={{ cursor: "pointer" }}
        >
          {listening ? "Stop" : "Listen"}
        </MdKeyboardVoice>
      )}

      {listening && (
        <form
          id="speech-recognition-form"
          style={{ width: "100%", position: "relative" }}
        >
          {supported && (
            <React.Fragment>
              <textarea
                id="transcript"
                name="transcript"
                placeholder="답변을 기다리고 있습니다..."
                value={userAnswer}
                rows={3}
                disabled
                className={styles.speech}
              />
              <FaRegStopCircle
                onClick={handleStop}
                style={{
                  position: "absolute",
                  bottom: "0.5rem",
                  right: "0.5rem",
                  color: "black",
                  cursor: "pointer",
                }}
                size={40}
              ></FaRegStopCircle>
            </React.Fragment>
          )}
        </form>
      )}
    </div>
  );
};

export default Speech;
