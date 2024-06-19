import React from "react";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

const QuestionList = ({
  playState,
  currentIndex,
  answeredIndices,
  setCurrentIndex,
  handleMoveIndex,
}) => {
  return (
    <div style={{ height: "63vh", overflowY: "scroll" }}>
      {playState.map((item, index) => (
        <div
          key={index}
          onClick={() => {
            setCurrentIndex(index);
            handleMoveIndex(index);
          }}
          style={{
            height: "7vh",
            background:
              currentIndex === index
                ? "gray"
                : // : answeredIndices.includes(index)
                  // ? "red"
                  "black",
            display: "flex",
            alignItems: "center",
            fontSize: "1.5rem",
            paddingLeft: "2%",
            border: "1px solid white",
            cursor: "pointer",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <MdOutlineFormatListBulleted
              style={{ marginRight: "0.5vw", paddingBottom: "0.5vh" }}
            />
            {`${index + 1}번 질문`}
          </div>

          {answeredIndices.includes(index) && (
            <FaRegCheckCircle size={30} style={{ marginRight: "1vw" }} />
          )}
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
