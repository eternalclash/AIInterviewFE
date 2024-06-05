import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import styles from "@/styles/main.module.css";
import { AiFillCodepenCircle } from "react-icons/ai";
import { MdUpload } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { messageState } from "@/state/messages";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import {
  LIST_LIST,
  PLAY_LIST,
  PRESET_LIST,
  SIDE_TYPE,
} from "@/utils/constants";
import Side from "@/components/Side";
const Main = ({ initialData }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [savedMessages, setSavedMessages] = useRecoilState(messageState);
  const router = useRouter();

  //
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleEditChange = (text, index) => {
    const updatedMessages = messages.map((msg, idx) => {
      if (idx === index) {
        return { ...msg, text: text };
      }
      return msg;
    });
    setMessages(updatedMessages);
  };

  const handleSave = (index) => {
    if (index < 1 || index >= messages.length) return; // 범위 밖 검사
    const pairOfMessages = [messages[index - 1].text, messages[index].text];
    setSavedMessages([pairOfMessages, ...savedMessages]);
    console.log(savedMessages);
  };

  const navigateToMessage = (idx) => {
    router.push(`/messages/${idx}`);
  };

  const navigateToPlay = () => {
    router.push("/play");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { text: input, sender: "user" },
      { text: "여기에 ChatGPT의 답변", sender: "bot" },
    ]);
    setInput("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.component}>
        <div></div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.4rem",
            width: "95%",
            justifyContent: "flex-start",
            marginBottom: "1vh",
          }}
        >
          <AiFillCodepenCircle size={50} />
          <div style={{ fontSize: "1.8rem" }}>
            필요한 면접질문들을 준비해봤어요!
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "1vw",
            width: "95%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              border: "1px solid",
              borderRadius: "1px",
              padding: "1%",
              fontSize: "1.4rem",
            }}
          >
            <div>인덱스란 무엇인가요?</div>
            <div style={{ fontSize: "0.8rem" }}>데이터베이스</div>
          </div>
          <div
            style={{
              width: "100%",
              border: "1px solid",
              borderRadius: "1px",
              padding: "1%",
              fontSize: "1.4rem",
            }}
          >
            <div>인덱스란 무엇인가요?</div>
            <div style={{ fontSize: "0.8rem" }}>데이터베이스</div>
          </div>
          <div
            style={{
              width: "100%",
              border: "1px solid",
              borderRadius: "1px",
              padding: "1%",
              fontSize: "1.4rem",
            }}
          >
            <div>인덱스란 무엇인가요?</div>
            <div style={{ fontSize: "0.8rem" }}>데이터베이스</div>
          </div>
          <div
            style={{
              width: "100%",
              border: "1px solid",
              borderRadius: "1px",
              padding: "1%",
              fontSize: "1.4rem",
            }}
          >
            <div>인덱스란 무엇인가요?</div>
            <div style={{ fontSize: "0.8rem" }}>데이터베이스</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "1.4rem",
            width: "95%",
            justifyContent: "flex-start",
            marginBottom: "1vh",
            marginTop: "4vh",
          }}
        >
          <AiFillCodepenCircle size={50} />
          <div style={{ fontSize: "1.8rem" }}>
            사용자가 제일 많이 선택한 질문들을 준비해보시는 게 어떠신가요?
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "1vw",
            width: "95%",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              border: "1px solid",
              borderRadius: "1px",
              padding: "1%",
              fontSize: "1.4rem",
            }}
          >
            <div>인덱스란 무엇인가요?</div>
            <div style={{ fontSize: "0.8rem" }}>데이터베이스</div>
          </div>
          <div
            style={{
              width: "100%",
              border: "1px solid",
              borderRadius: "1px",
              padding: "1%",
              fontSize: "1.4rem",
            }}
          >
            <div>인덱스란 무엇인가요?</div>
            <div style={{ fontSize: "0.8rem" }}>데이터베이스</div>
          </div>
          <div
            style={{
              width: "100%",
              border: "1px solid",
              borderRadius: "1px",
              padding: "1%",
              fontSize: "1.4rem",
            }}
          >
            <div>인덱스란 무엇인가요?</div>
            <div style={{ fontSize: "0.8rem" }}>데이터베이스</div>
          </div>
          <div
            style={{
              width: "100%",
              border: "1px solid",
              borderRadius: "1px",
              padding: "1%",
              fontSize: "1.4rem",
            }}
          >
            <div>인덱스란 무엇인가요?</div>
            <div style={{ fontSize: "0.8rem" }}>데이터베이스</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {
      initialData: PRESET_LIST,
    },
  };
};

export default Main;
