import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/main.module.css";
import { TiPlus } from "react-icons/ti";
import { FaPlayCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import {
  getSimulations,
  startSimulation,
  getSimulationsLog,
  getAudio,
} from "@/apis/api"; // Adjust the path according to your project structure
import AudioPermissionModal from "@/components/AudioPermissionModal"; // Adjust the path according to your project structure
import { useRecoilState } from "recoil";
import { saveState } from "@/state/saveState.js";
import { audioState } from "@/state/audioUrls.js";

const SaveList = () => {
  const [playState, setPlayState] = useRecoilState(saveState);
  const [audState, setAudioState] = useRecoilState(audioState);
  const [selectedPlaylist, setSelectedPlaylist] = useState(-1);
  const [audioGranted, setAudioGranted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state
  const router = useRouter();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["saveList"],
    queryFn: getSimulationsLog,
  });

  const handlePlaylistClick = async (playlist, index) => {
    setSelectedPlaylist(index);
    const length = playlist.simulationLogs.length;
    const id = playlist.id;
    const type = "audio/wav";
    let data = {length,id,type}
    const response = await getAudio(data);
    console.log(response);
    setPlayState(playlist.simulationLogs);
    setAudioState(response.data.result.audioUrls);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const playList = isSuccess ? data : [];
  console.log(playList, "playState");

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
        지난 모의면접을 확인해봅시다!
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
        면접 목록을 확인해보세요!
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
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading playlists</p>}
        {playList?.map((p, index) => (
          <div
            key={index}
            onClick={() => handlePlaylistClick(p, index)}
            style={{
              marginBottom: "1vh",
              border: "1px solid white",
              borderRadius: "1%",
              padding: "1%",
              fontSize: "1.3rem",
              cursor: "pointer",
              background: selectedPlaylist === index ? "white" : "transparent",
              color: selectedPlaylist === index ? "black" : "inherit",
            }}
          >
            {p.title}
            {formatDate(p.timestamp)}
          </div>
        ))}
      </div>

      {selectedPlaylist >= 0 && (
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
          onClick={async () => {
            console.log("플레이리스트명", selectedPlaylist);

            await startSimulation({ simulationListName: selectedPlaylist });
            console.log(selectedPlaylist);
            router.push("/save");
          }}
        >
          <FaPlayCircle
            size={30}
            style={{ paddingBottom: "1", marginRight: "0.5vw" }}
          />
          시작하기
        </div>
      )}

      {isModalOpen && (
        <AudioPermissionModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default SaveList;
