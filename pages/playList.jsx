import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/main.module.css";
import { TiPlus } from "react-icons/ti";
import { FaPlayCircle } from "react-icons/fa";
import { getInterviews, postSimulations, getSimulation } from "@/apis/api";
import { sidebarState } from "@/state/sidebarState.js";
import { useRecoilState } from "recoil";
import {
  LIST_LIST,
  PLAY_LIST,
  PRESET_LIST,
  SIDE_TYPE,
} from "@/utils/constants.js";
const PlayList = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  console.log(selectedPlaylists);
  const router = useRouter();
  const [{ clicked, list }, setSidebar] = useRecoilState(sidebarState);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getInterviews();
      setPlaylists(response?.data.result);
    };
    fetchData();
  }, []);

  const handlePlaylistClick = (playlist) => {
    const index = selectedPlaylists.findIndex((p) => p.id === playlist.id);
    if (index === -1) {
      setSelectedPlaylists([...selectedPlaylists, playlist]);
    } else {
      setSelectedPlaylists(
        selectedPlaylists.filter((p) => p.id !== playlist.id)
      );
    }
  };

  const handleCreatePlaylist = async () => {
    const data = { simulationListName: playlistName };
    const arr = [];
    for (let x of selectedPlaylists) {
      arr.push(x.id);
    }
    data["memberQAIds"] = arr;
    await postSimulations(data);
    window.alert("면접리스트 생성완료");
    let dataResponse = await getSimulation();
    setSidebar({
      list: dataResponse?.data.result,
      clicked: SIDE_TYPE.PLAY,
    });
    console.log(dataResponse)
  };

  // 선택된 항목의 순서를 찾아서 표시
  const getOrderNumber = (playlist) => {
    return selectedPlaylists.findIndex((p) => p.id === playlist.id) + 1;
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
        모의면접을 저장해주세요!
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
        <input
          style={{
            width: "25vw",
            height: "4vh",
            fontSize: "1.2rem",
            paddingLeft: "0.5vw",
            color: "black",
          }}
          placeholder="재생목록명을 만들어주세요"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <div
          style={{
            marginLeft: "1vw",
            fontSize: "1.2rem",

            borderRadius: "0.5vw",
            cursor: playlistName ? "pointer" : "not-allowed",
            color: playlistName ? "white" : "gray",
            display: "flex",
            alignItems: "center",
          }}
          disabled={!playlistName}
          onClick={handleCreatePlaylist}
        >
          <TiPlus size={30} style={{ paddingBottom: "2%" }} />
          재생목록 만들기
        </div>
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
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {playlist.question}
            {selectedPlaylists.includes(playlist) && (
              <div style={{ color: "black" }}>{getOrderNumber(playlist)}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayList;
