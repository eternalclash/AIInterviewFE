import React from 'react';
import styles from '@/styles/modal.module.css'; // 스타일을 별도의 CSS 파일로 분리

const Modal = ({ children, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
