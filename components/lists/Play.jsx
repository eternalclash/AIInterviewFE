import { GetServerSideProps } from "next";
import styles from "@/styles/main.module.css";
import { FaFolder, FaFile, FaPlayCircle, FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import { deleteSimulations } from "@/apis/api";
const Play = ({ list, onSelect }) => {
  const [openedCategories, setOpenedCategories] = useState({});
  const [hoveredQuestion, setHoveredQuestion] = useState(null);
  console.log(hoveredQuestion);
  // 카테고리 토글 핸들러
  const toggleCategory = (category) => {
    setOpenedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleDelete = (category) => {
    deleteSimulations(category);

    setHoveredQuestion(null); // To re-render the component
  };
  console.log(list);
  const router = useRouter();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "0.9rem",
          height: "4vh",
          cursor: "pointer",
        }}
        onClick={() => router.push("/playList")}
      >
        <FaPlus style={{ paddingBottom: "0.5%", marginRight: "0.5vw" }} />
        재생목록 추가하기
      </div>
      {Object.entries(list || {})?.map(([category, questions], index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredQuestion(index)}
          onMouseLeave={() => setHoveredQuestion(null)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
                  position: "relative",
                  background:
                    hoveredQuestion === idx ? "#f0f0f0" : "transparent",
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
                    width: "80%",
                  }}
                >
                  {item.question}
                </div>
              </div>
            ))}
          {hoveredQuestion === index && (
            <div
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => handleDelete(category)}
            >
              <MdDelete size="1.2em" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Play;
