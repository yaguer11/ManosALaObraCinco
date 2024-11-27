import styles from "./Card.module.scss";

/* eslint-disable react/prop-types */
function Card({ title, description, onClick, children }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div className={styles.actions}>{children}</div>
    </div>
  );
}

export default Card;
