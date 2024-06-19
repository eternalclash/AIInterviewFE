import React, { useState } from 'react';

const AudioPermissionModal = ({ isOpen, onClose, onGrant }) => {
  const [error, setError] = useState(null);

  const requestAudioPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      onGrant();
      setError(null); // 에러 상태 초기화
    } catch (error) {
      console.error('Audio permission denied:', error);
      setError('음성 권한이 거부되었습니다. 브라우저 설정에서 권한을 변경해주세요.');
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2>마이크 접근 허용</h2>
        <p>모의 면접을 진행하기 위해 마이크 접근이 필요합니다.</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button onClick={requestAudioPermission}>허용하기</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default AudioPermissionModal;
