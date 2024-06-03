// pages/messages/[id].js
import { useRouter } from "next/router";
import { useRecoilValue, useRecoilState } from "recoil";
import { messageState } from "@/state/messages";
import { GetServerSideProps } from "next";
import { useState } from "react";
import styles from "@/styles/main.module.css";
import { AiFillCodepenCircle } from "react-icons/ai";
import { AiFillProduct } from "react-icons/ai";
import { MdUpload } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import Side from "@/components/Side";
const Messages = () => {
  const router = useRouter();
  const messages = useRecoilValue(messageState);
  console.log(messages);

  const [savedMessages, setSavedMessages] = useRecoilState(messageState);
  return (
    <div className={styles.main}>
      <Side />
      <div className={styles.component}>
        <div></div>
        <div className={styles.center}>
          <div className={styles.chat}>
            <div>
              <FaRegUserCircle size={50} />
              <input
                className={styles.ml}
                value={messages.question}
                onChange={(e) => handleEditChange(e.target.value, index)}
              />
            </div>
          </div>
          <div className={styles.chat}>
            <div>
              <AiFillCodepenCircle size={50} />
              <input
                className={styles.ml}
                value={messages.answer}
                onChange={(e) => handleEditChange(e.target.value, index)}
              />
              <div className={styles.saveBtn} onClick={() => handleSave(index)}>
                저장하기
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottom}></div>
      </div>
    </div>
  );
};

export default Messages;
