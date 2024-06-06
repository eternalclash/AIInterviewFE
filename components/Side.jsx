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
import { messageState } from "@/state/messages";

const Sidebar = () => {
  const [{ clicked, list }, setSidebar] = useRecoilState(sidebarState);
  const [{ question, answer }, setMessageState] = useRecoilState(messageState);
  const handleClick = (type) => {
    let newList = list;
    switch (type) {
      case SIDE_TYPE.LIST:
        newList = LIST_LIST;
        break;
      case SIDE_TYPE.PLAY:
        newList = PLAY_LIST;
        break;
      case SIDE_TYPE.PRESET:
        newList = PRESET_LIST;
        break;
    }
    setSidebar({ clicked: type, list: newList });
  };

  const handleSelectMessage = (item) => {
    // 여기서 item은 { question, answer } 객체를 포함할 것으로 예상
    setMessageState({ question: item.question, answer: item.answer });
    router.push("/messages");
  };
  const router = useRouter();
  const navigateToMessage = (idx) => {
    router.push(`/messages/${idx}`);
  };

  return (
    <div className={styles.sidebar}>
      <div style={{ minHeight: "25vh", width: "85%" }}>
        <div className={styles.title} onClick={() => router.push("/")}>
          <AiFillCodepenCircle className={styles.mr} size={20} />
          AI면접리스트 생성기
        </div>
        <div className={styles.title2} onClick={() => router.push("/simulate")}>
          <AiFillProduct className={styles.mr} size={20} />
          모의면접 실행하기
        </div>
        <div className={`${styles.line}`}></div>
        <div
          className={`${styles.sideBtn} ${
            clicked === SIDE_TYPE.PRESET ? styles.clicked : ""
          }`}
          onClick={() => handleClick(SIDE_TYPE.PRESET)}
        >
          면접 예상질문
        </div>
        <div
          className={`${styles.sideBtn} ${
            clicked === SIDE_TYPE.LIST ? styles.clicked : ""
          }`}
          onClick={() => handleClick(SIDE_TYPE.LIST)}
        >
          나의 면접리스트
        </div>
        <div
          className={`${styles.sideBtn} ${
            clicked === SIDE_TYPE.PLAY ? styles.clicked : ""
          }`}
          onClick={() => handleClick(SIDE_TYPE.PLAY)}
        >
          모의면접 재생목록
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
            <List list={list} onSelect={handleSelectMessage} />
          )) ||
          (clicked === SIDE_TYPE.PLAY && (
            <Play list={list} onSelect={handleSelectMessage} />
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
