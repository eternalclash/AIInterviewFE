import { useState } from "react";
import { GetServerSideProps } from "next";
import styles from "@/styles/main.module.css";
import { TiPlus } from "react-icons/ti";
import { FaPlayCircle } from "react-icons/fa";
import { useRouter } from "next/router";

const Simulate = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const router = useRouter();
  const handlePlaylistClick = (playlist) => {
    setSelectedPlaylist(playlist);
  };

  return (
    <div
      className={styles.main}
      style={{ alignItems: "center", flexDirection: "column" }}
    >
      <div
        style={{
          fontSize: "3rem",
          display: "flex",
          paddingLeft: "10%",
          width: "100%",
        }}
      >
        모의면접을 진행하겠습니다!
      </div>
      <div
        style={{
          fontSize: "2rem",
          display: "flex",
          paddingLeft: "10%",
          width: "100%",
          marginBottom: "10vh",
        }}
      >
        재생목록을 선택해주세요
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          paddingLeft: "10%",
          width: "100%",
          paddingRight: "10%",
          fontSize: "1.2rem",
          justifyContent: "flex-end",
          cursor: "pointer",
          marginBottom: "1vh",
        }}
      >
        <TiPlus size={30} style={{ paddingBottom: "1" }} />
        재생목록 만들기
      </div>

      <div
        style={{
          fontSize: "2rem",
          paddingLeft: "10%",
          width: "100%",
          paddingRight: "10%",
          maxHeight: "50vh",
          overflowY: "scroll",
        }}
        className={styles.interviewList}
      >
        {["재생목록1", "재생목록2", "재생목록3", "재생목록4", "재생목록5"].map(
          (playlist, index) => (
            <div
              key={index}
              onClick={() => handlePlaylistClick(playlist)}
              style={{
                marginBottom: "1vh",
                border: "1px solid white",
                borderRadius: "1%",
                padding: "1%",
                fontSize: "1.3rem",
                cursor: "pointer",
                background:
                  selectedPlaylist === playlist ? "white" : "transparent",
                color: selectedPlaylist === playlist ? "black" : "inherit",
              }}
            >
              {playlist}
            </div>
          )
        )}
      </div>

      {selectedPlaylist && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "80%",
            fontSize: "1.2rem",
            justifyContent: "center",
            cursor: "pointer",
            marginBottom: "1vh",
            background: "var(--gray-400)",
            padding: "0.5%",
          }}
          onClick={() => router.push("/play")}
        >
          <FaPlayCircle
            size={30}
            style={{ paddingBottom: "1", marginRight: "0.5vw" }}
          />
          시작하기
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default Simulate;
