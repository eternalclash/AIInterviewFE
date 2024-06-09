import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/main.module.css";
import { TiPlus } from "react-icons/ti";
import { FaPlayCircle } from "react-icons/fa";
import { getInterviews } from "@/apis/api";

const PlayList = () => {
  const [playlists, setPlaylists] = useState([]); // 모든 플레이리스트
  const [selectedPlaylists, setSelectedPlaylists] = useState([]); // 선택된 플레이리스트들

  const router = useRouter();

  // 플레이리스트를 불러오는 함수
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInterviews();
      setPlaylists(response?.data.result);
    };
    fetchData();
  }, []);
  console.log(playlists)
  // 플레이리스트 클릭 핸들러
  const handlePlaylistClick = (playlist) => {
    // 이미 선택된 플레이리스트인지 체크
    const index = selectedPlaylists.findIndex((p) => p.id === playlist.id);
    if (index === -1) {
      // 선택되지 않았다면 추가
      setSelectedPlaylists([...selectedPlaylists, playlist]);
    } else {
      // 이미 선택되었다면 제거
      setSelectedPlaylists(
        selectedPlaylists.filter((p) => p.id !== playlist.id)
      );
    }
  };

  console.log(selectedPlaylists); // 현재 선택된 플레이리스트 확인

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
        {playlists.map((playlist, index) => (
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
              background: selectedPlaylists.includes(playlist)
                ? "white"
                : "transparent",
              color: selectedPlaylists.includes(playlist) ? "black" : "inherit",
            }}
          >
            {playlist.question}
          </div>
        ))}
      </div>
      {selectedPlaylists.length > 0 && (
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

export default PlayList;
