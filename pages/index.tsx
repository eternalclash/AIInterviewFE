import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import styles from "@/styles/main.module.css";
import { AiFillCodepenCircle } from "react-icons/ai";
import { MdUpload } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { messageState } from "@/state/messages";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { LIST_LIST, PLAY_LIST, PRESET_LIST, SIDE_TYPE } from "@/utils/constants";
import Side from "@/components/Side";
const main = ({ initialData }) => {
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
      <Side />
      <div className={styles.component}>
        <div></div>
        {messages.length == 0 && (
          <div className={styles.center}>
            <AiFillCodepenCircle size={50} />
            <div>면접질문들을 생성해보아요! </div>
          </div>
        )}
        <div className={styles.center}>
          {messages.map((message, index) => (
            <div key={index} className={styles.chat}>
              {message.sender === "bot" ? (
                <div>
                  <AiFillCodepenCircle size={50} />
                  <input
                    className={styles.ml}
                    value={message.text}
                    onChange={(e) => handleEditChange(e.target.value, index)}
                  />
                  <div
                    className={styles.saveBtn}
                    onClick={() => handleSave(index)}
                  >
                    저장하기
                  </div>
                </div>
              ) : (
                <div>
                  <FaRegUserCircle size={50} />
                  <input
                    className={styles.ml}
                    value={message.text}
                    onChange={(e) => handleEditChange(e.target.value, index)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.bottom}>
          <div className={styles["search-container"]}>
            <input
              type="text"
              placeholder="면접 질문을 만들어보아요"
              className={styles["search-input"]}
              value={input}
              onChange={handleInputChange}
            />
            <button onClick={handleSubmit} className={styles["search-button"]}>
              <MdUpload size={25} />
            </button>
          </div>
          <div className={styles.alertText}>
            면접리스트 생성기는 잘못된 정보를 생성할 수 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      initialData: PRESET_LIST,
    },
  };
};

export default main;
