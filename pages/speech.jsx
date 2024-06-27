import React, { useState, useEffect, useRef } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import styles from "@/styles/main.module.css";
import { MdKeyboardVoice } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import useAudioRecorder from "@/hooks/useAudioRecorder";
import axios from "axios";
import { postAudio } from "@/apis/api";

const Speech = ({
  userAnswer,
  setUserAnswer,
  handleSubmitAnswer,
  currentIndex,
}) => {
  const [listening, setListening] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const { audioBlob, isRecording, startRecording, stopRecording } =
    useAudioRecorder();
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setBlocked(true);
    } else {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = true;

      recognition.onresult = (event) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        setUserAnswer(finalTranscript);
      };

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
        if (listening) {
          recognition.start(); // Ensure it continues listening
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !blocked) {
      recognitionRef.current.start();
      setListening(true);
      startRecording(); // Start audio recording as well
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      stopRecording(); // Stop audio recording as well
    }
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
      stopRecording();
    } else {
      startListening();
      startRecording();
    }
  };

  const handleStop = async () => {
    stop();
    stopRecording();
  };

  const uploadAudioBlob = async (blob) => {
    const formData = new FormData();
    formData.append("file", blob, "recording.wav");
    let data = {
      fileExtension: "audio/wav",
      fileOrder: currentIndex,
    };
    let res = (await postAudio(data)).data.result.presignedUrl;
    try {
      const response = await axios.put(res, blob, {
        headers: {
          "Content-Type": "audio/wav",
        },
      });
      console.log("Upload success:", response);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  useEffect(() => {
    if (audioBlob) {
      uploadAudioBlob(audioBlob);
      handleSubmitAnswer();
    }
  }, [audioBlob]);

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
          onClick={toggleListening}
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
          {
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
                onClick={toggleListening}
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
          }
        </form>
      )}
    </div>
  );
};

export default Speech;
