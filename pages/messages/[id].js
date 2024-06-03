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
const MessageDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const messages = useRecoilValue(messageState);
  console.log(messages);
  if (!messages[id]) {
    return <div>메시지를 찾을 수 없습니다.</div>;
  }

  const navigateToMessage = (idx) => {
    router.push(`/messages/${idx}`);
  };

  const navigateToHome = () => {
    router.push("/");
  };

  const [savedMessages, setSavedMessages] = useRecoilState(messageState);
  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div className={styles.title} onClick={() => navigateToHome()}>
          <AiFillCodepenCircle className={styles.mr} size={20} />
          AI면접리스트 생성기
        </div>
        <div className={styles.title2}>
          <AiFillProduct className={styles.mr} size={20} />
          모의면접 실행하기
        </div>
        <div className={styles.sideComponent}>
          <div className={styles.dateTitle}>오늘</div>
          {savedMessages?.map((e, idx) => (
            <div
              key={idx}
              className={styles.title2}
              onClick={() => navigateToMessage(idx)}
            >
              {e[0]}
            </div>
          ))}
        </div>
        <div className={styles.sideComponent}>
          <div className={styles.dateTitle}>어제 </div>
          <form className={styles.title2}>
            <label>
              안녕하세요d
              <input type="checkbox" name="interest" value="sports" />
            </label>
          </form>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
        </div>

        <div className={styles.sideComponent}>
          <div className={styles.dateTitle}>그저께</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
        </div>
        <div className={styles.sideComponent}>
          <div className={styles.dateTitle}>그저께</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
        </div>
        <div className={styles.sideComponent}>
          <div className={styles.dateTitle}>그저께</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
        </div>
        <div className={styles.sideComponent}>
          <div className={styles.dateTitle}>그저께</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
          <div className={styles.title2}>안녕하세요</div>
        </div>
      </div>
      <div className={styles.component}>
        <div></div>
        <div className={styles.center}>
          <div className={styles.chat}>
            <div>
              <FaRegUserCircle size={50} />
              <input
                className={styles.ml}
                value={messages[id][0]}
                onChange={(e) => handleEditChange(e.target.value, index)}
              />
            </div>
          </div>
          <div className={styles.chat}>
            <div>
              <AiFillCodepenCircle size={50} />
              <input
                className={styles.ml}
                value={messages[id][1]}
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

export default MessageDetail;
