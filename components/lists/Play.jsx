import { GetServerSideProps } from "next";
import styles from "@/styles/main.module.css";
import { FaFolder, FaFile, FaPlayCircle, FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import { deleteSimulations, getSimulation } from "@/apis/api";
import { sidebarState } from "@/state/sidebarState";
import { useRecoilState } from "recoil";
import { SIDE_TYPE } from "@/utils/constants";
const Play = ({ list, onSelect, setSidebar }) => {
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

  const handleDelete = async (category) => {
    await deleteSimulations(category);
    let dataResponse = await getSimulation();
    setSidebar({
      list: dataResponse?.data.result,
      clicked: SIDE_TYPE.PLAY,
    });
    setHoveredQuestion(null); // To re-render the component
  };
  console.log(list);
  const router = useRouter();
  return (
    <div style={{ maxHeight: "70vh" }}>
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
            alignItems: "space-between",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
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
            <div>{questions.simulationListName}</div>
          </div>
          {openedCategories[category] &&
            questions.simulationList.map((item, idx) => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "0.9rem",
                  height: "4vh",
                  cursor: "pointer",
                  position: "relative",
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
                position: "absolute",
                right: "0%",
                top: "0%",
                cursor: "pointer",
              }}
              onClick={(e) => handleDelete(questions.simulationListId)}
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
