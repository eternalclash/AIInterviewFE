import React from "react";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaHistory,
} from "react-icons/fa";

const NavigationButtons = ({ handlePrev, handleRestart, handleNext }) => {
  return (
    <div
      style={{
        height: "10vh",
        width: "100%",
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
  );
};

export default NavigationButtons;
