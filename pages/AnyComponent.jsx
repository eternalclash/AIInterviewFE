import React, { useState, useEffect, useRef } from "react";

const AnyComponent = ({}) => {
  const [listening, setListening] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
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
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

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
      {!listening ? (
        <button
          onClick={toggleListening}
          disabled={blocked}
          style={{ cursor: "pointer" }}
        >
          Start Listening
        </button>
      ) : (
        <button onClick={toggleListening} style={{ cursor: "pointer" }}>
          Stop Listening
        </button>
      )}

      <form
        id="speech-recognition-form"
        style={{ width: "100%", position: "relative" }}
      >
        <textarea
          id="transcript"
          name="transcript"
          placeholder="답변을 기다리고 있습니다..."
          value={userAnswer}
          rows={3}
          disabled
          style={{
            width: "100%",
            height: "100%",
            padding: "1rem",
            fontSize: "1rem",
            border: "1px solid var(--gray-300)",
            borderRadius: "0.25rem",
          }}
        />
      </form>
    </div>
  );
};

export default AnyComponent;
