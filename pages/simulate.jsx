import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "@/styles/main.module.css";
import { TiPlus } from "react-icons/ti";
import { FaPlayCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { getSimulations, startSimulation } from "@/apis/api"; // Adjust the path according to your project structure
import AudioPermissionModal from "@/components/AudioPermissionModal"; // Adjust the path according to your project structure
import { useRecoilState } from "recoil";
import { playListState } from "@/state/playState.js";

const Simulate = () => {
  const [playState, setPlayState] = useRecoilState(playListState);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [audioGranted, setAudioGranted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Add modal state
  const router = useRouter();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["simulations"],
    queryFn: getSimulations,
  });

  useEffect(() => {
    checkAudioPermission();
  }, []);

  const checkAudioPermission = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setAudioGranted(true);
          stream.getTracks().forEach((track) => track.stop());
        });
    } catch (error) {
      setAudioGranted(false);
    }
  };

  const handlePlaylistClick = (playlist) => {
    console.log(playlist);
    setSelectedPlaylist(playlist.simulationListName);
    setPlayState(playlist.simulationList);
  };

  const playList = isSuccess ? data : [];

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
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading playlists</p>}
        {playList.map((playlist, index) => (
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
                selectedPlaylist === playlist.simulationListName
                  ? "white"
                  : "transparent",
              color:
                selectedPlaylist === playlist.simulationListName
                  ? "black"
                  : "inherit",
            }}
          >
            {playlist.simulationListName}
          </div>
        ))}
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
          onClick={async () => {
            if (audioGranted) {
              console.log("플레이리스트명", selectedPlaylist);

              await startSimulation({ simulationListName: selectedPlaylist });
              router.push("/play");
            } else {
              setIsModalOpen(true); // Show permission request modal
            }
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

export default Simulate;
