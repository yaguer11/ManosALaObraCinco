import styles from "./Card.module.scss";

/* eslint-disable react/prop-types */
function Card({
  title,
  description,
  createdAt,
  onClick,
  children,
  status,
  points,
}) {
  const getStatusLabel = (status) => {
    switch (status) {
      case "todo":
        return "Pendiente";
      case "running":
        return "En progreso";
      case "done":
        return "Hecho";
      default:
        return "Desconocido";
    }
  };
  return (
    <div className={styles.card} onClick={onClick}>
      <h2>{title}</h2>
      <p>
        <span className={styles.label}>Descripción:</span> {description}
      </p>
      {createdAt && (
        <p>
          <span className={styles.label}>Creado:</span>{" "}
          {createdAt.split("T")[0]}
        </p>
      )}
      {status && (
        <p>
          <span className={styles.label}>Estado:</span> {getStatusLabel(status)}
        </p>
      )}
      {points !== undefined && (
        <p>
          <span className={styles.label}>Puntos de historia:</span> {points}
        </p>
      )}
      <div className={styles.actions}>{children}</div>
    </div>
  );
}

export default Card;
