import React, { useState } from "react";
import { FaFolder, FaFile } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

const Preset = ({ list, onSelect }) => {
  const [openedCategories, setOpenedCategories] = useState({});

  // 카테고리 토글 핸들러
  const toggleCategory = (category) => {
    setOpenedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  console.log(list);

  return (
    <div style={{ maxHeight: "40vh" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "0.9rem",
          height: "4vh",
          cursor: "pointer",
        }}
        onClick={() =>
          onSelect({
            question: "면접 질문을 만들어보세요",
            answer: "새로 답변을 만들어보세요",
            canEdit: true,
          })
        }
      >
        <FaPlus style={{ paddingBottom: "0.5%", marginRight: "0.5vw" }} />
        면접리스트 추가하기
      </div>
      {Object?.entries(list).map(([category, questions], index) => (
        <div key={index}>
          <div
            onClick={() => toggleCategory(category)}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.9rem",
              height: "4vh",
              cursor: "pointer",
              maxHeight: "100%",
            }}
          >
            <IoIosArrowForward
              size="1.5em"
              style={{
                marginRight: "0.2em",
                transform: openedCategories[category]
                  ? "rotate(90deg)"
                  : "rotate(0deg)",
              }}
            />
            <FaFolder size="1.2em" style={{ marginRight: "0.5vw" }} />
            <div>{category}</div>
          </div>
          {openedCategories[category] &&
            questions.map((item, idx) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.9rem",
                  height: "4vh",
                  cursor: "pointer",
                  marginBottom: "0.5vh",
                }}
                key={idx}
                onClick={() =>
                  onSelect({ ...item, presetQaId: item.id, canEdit: true })
                }
              >
                <div
                  style={{
                    width: "10%",
                    marginLeft: "1.7em",
                    marginRight: "0.5vw",
                  }}
                >
                  <FaFile size="1.2em" />
                </div>
                <div
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                  }}
                >
                  {item.question}
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Preset;
