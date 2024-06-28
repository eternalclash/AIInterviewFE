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
import { useQuery } from "@tanstack/react-query";
import { getSimulations } from "@/apis/api.js";
export default function MyPlay() {
  const [openedCategories, setOpenedCategories] = useState({});
  const [hoveredQuestion, setHoveredQuestion] = useState(null);

  const [list, setList] = useState();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["simulations"],
    queryFn: getSimulations,
  });

  console.log(data);

  const toggleCategory = (category) => {
    setOpenedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const onSelect = (item) => {
    setMessageState({
      question: item?.question,
      answer: item?.answer,
      presetQaId: item?.presetQaId,
      canEdit: item?.canEdit,
    });
    router.push("/messages");
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
    <div
      className={styles.main}
      style={{ flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ width: "70%", fontSize: "1.2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "0.9rem",
            height: "4vh",
            cursor: "pointer",
            flexDirection: "column",
          }}
          onClick={() => router.push("/playList")}
        >
          <FaPlus style={{ paddingBottom: "0.5%", marginRight: "0.5vw" }} />
          재생목록 추가하기
        </div>
        {data?.map((d, index) => (
          <div
            // key={index}
            // onMouseEnter={() => setHoveredQuestion(index)}
            // onMouseLeave={() => setHoveredQuestion(null)}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              flexDirection: "column",
              position: "relative",
              fontSize: "1.2rem",
            }}
          >
            <div
              onClick={() => toggleCategory(category)}
              style={{
                display: "flex",
                
                fontSize: "1.2rem",
                height: "4vh",
                cursor: "pointer",
              }}
            >
              <IoIosArrowForward
                size="1.5em"
                style={{
                  marginRight: "0.2em",
                  transform: d.simulationListName
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              />
              <FaPlayCircle size="1.2em" style={{ marginRight: "0.5vw" }} />
              <div>{d.simulationListName}</div>
            </div>
            {d.simulationList.map((item, idx) => (
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
    </div>
  );
}
