import React from 'react';
import styles from '../styles/ErrorModule.module.css';

const ErrorModule = ({ message, onClose }) => {
  return (
    <div className={styles.errorModule}>
      <div className={styles.errorMessage}>{message}</div>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ErrorModule;
