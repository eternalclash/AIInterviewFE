import { GetServerSideProps } from "next";
import styles from "@/styles/main.module.css";
import { FaFolder, FaFile, FaPlayCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
const Play = ({ list, onSelect }) => {
  const [openedCategories, setOpenedCategories] = useState({});

  // 카테고리 토글 핸들러
  const toggleCategory = (category) => {
    setOpenedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div>
      {Object.entries(list || {}).map(([category, questions], index) => (
        <div key={index}>
          <div
            onClick={() => toggleCategory(category)}
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.9rem",
              height: "4vh",
              cursor: "pointer",
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
            <FaPlayCircle size="1.2em" style={{ marginRight: "0.5vw" }} />
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
                }}
                key={idx}
                onClick={() => onSelect(item)}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Play;
