import styles from "../Alert/Alert.module.scss";

/* eslint-disable react/prop-types */
function Alert({ type = "success", message, onClose }) {
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Alert;
