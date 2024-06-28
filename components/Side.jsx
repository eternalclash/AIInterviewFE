// components/Sidebar.js
import { useRecoilState } from "recoil";
import { sidebarState } from "@/state/sidebarState.js";
import {
  LIST_LIST,
  PLAY_LIST,
  PRESET_LIST,
  SIDE_TYPE,
} from "@/utils/constants.js";
import Preset from "@/components/lists/Preset";
import List from "@/components/lists/List";
import Play from "@/components/lists/Play";
import styles from "@/styles/main.module.css";
import { useRouter } from "next/router";
import { AiFillCodepenCircle, AiFillProduct } from "react-icons/ai";
import { MdSave } from "react-icons/md";

import { messageState } from "@/state/messages";
import { getInterviews, getPresets, getSimulation } from "@/apis/api";
import { useEffect } from "react";

const Sidebar = () => {
  const [{ clicked, list }, setSidebar] = useRecoilState(sidebarState);
  const [{ question, answer }, setMessageState] = useRecoilState(messageState);
  const handleClick = async (type) => {
    let dataResponse;
    switch (type) {
      case SIDE_TYPE.LIST:
        dataResponse = await getInterviews();
        break;
      case SIDE_TYPE.PLAY:
        dataResponse = await getSimulation();
        break;
      case SIDE_TYPE.PRESET:
        dataResponse = await getPresets();
        break;
    }
    console.log(type);
    console.log(dataResponse);
    if (dataResponse?.data?.result) {
      setSidebar({ clicked: type, list: dataResponse.data.result });
    } else {
      console.log("No data received or error in API response");
      setSidebar((prevState) => ({ ...prevState, clicked: type, list: [] }));
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getPresets();
      setSidebar((prevState) => ({
        ...prevState,
        list: response.data.result,
      }));
    }
    fetchData();
  }, []);

  const handleSelectMessage = (item) => {
    setMessageState({
      question: item?.question,
      answer: item?.answer,
      presetQaId: item?.presetQaId,
      canEdit: item?.canEdit,
    });
    router.push("/messages");
  };

  const handleListMessage = (item) => {
    setMessageState({
      question: item.question,
      answer: item.answer,
      id: item?.id,
    });
    router.push("/interviewLists");
  };
  const router = useRouter();
  const navigateToMessage = (idx) => {
    router.push(`/messages/${idx}`);
  };

  return (
    <div className={styles.sidebar}>
      <div style={{ width: "85%" }}>
        <div
          className={styles.title}
          style={{ marginTop: "2vh" }}
          onClick={() => router.push("/")}
        >
          <AiFillCodepenCircle className={styles.mr} size={20} />
          PrepSmart
        </div>
        <div className={styles.title} onClick={() => router.push("/simulate")}>
          <AiFillProduct className={styles.mr} size={20} />
          면접 실행하기
        </div>
        <div
          className={styles.title}
          onClick={() =>
            handleSelectMessage({
              question: "면접 질문을 만들어보세요",
              answer: "새로 답변을 만들어보세요",
              canEdit: true,
            })
          }
        >
          <MdSave className={styles.mr} size={20} />
          면접질문 만들기
        </div>
        <div className={`${styles.line}`}></div>
        <div
          className={`${styles.sideBtn} ${
            clicked === SIDE_TYPE.PRESET ? styles.clicked : ""
          }`}
          onClick={() => handleClick(SIDE_TYPE.PRESET)}
        >
          면접 프리셋
        </div>
        <div
          className={`${styles.sideBtn} ${
            clicked === SIDE_TYPE.LIST ? styles.clicked : ""
          }`}
          onClick={() => handleClick(SIDE_TYPE.LIST)}
        >
          MY 면접리스트
        </div>

        <div
          className={`${styles.sideBtn} ${
            clicked === SIDE_TYPE.PLAY ? styles.clicked : ""
          }`}
          onClick={() => handleClick(SIDE_TYPE.PLAY)}
        >
          MY 재생목록
        </div>
      </div>
      <div className={styles.sideComponent}>
        <div className={styles.dateTitle}>
          {(clicked === SIDE_TYPE.PLAY && "모의면접 재생목록") ||
            (clicked === SIDE_TYPE.LIST && "나의 면접리스트") ||
            (clicked === SIDE_TYPE.PRESET && "면접 예상질문")}
        </div>
        {(clicked === SIDE_TYPE.PRESET && (
          <Preset list={list} onSelect={handleSelectMessage} />
        )) ||
          (clicked === SIDE_TYPE.LIST && (
            <List list={list} onSelect={handleListMessage} />
          )) ||
          (clicked === SIDE_TYPE.PLAY && (
            <Play
              list={list}
              setSidebar={setSidebar}
              onSelect={handleSelectMessage}
            />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
