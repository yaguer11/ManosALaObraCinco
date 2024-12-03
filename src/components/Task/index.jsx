import styles from "../Task/Task.module.scss";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

/* eslint-disable react/prop-types */
const Task = ({
  name,
  description,
  createdAt,
  dueDate,
  done,
  onEditar,
  onEliminar,
}) => {
  return (
    <div className={styles.task}>
      <h2>{name}</h2>
      <p>
        <span className={styles.label}>Descripción:</span> {description}
      </p>
      {createdAt && (
        <p>
          <span className={styles.label}>Creado:</span>{" "}
          {createdAt.split("T")[0]}
        </p>
      )}
      {dueDate && (
        <p>
          <span className={styles.label}>Vencimiento:</span>{" "}
          {dueDate.split("T")[0]}
        </p>
      )}
      <p>
        <span className={styles.label}>Estado:</span>{" "}
        <span className={done ? styles.completed : styles.pending}>
          {done ? "Completada" : "Pendiente"}
        </span>
      </p>
      <div className={styles.actions}>
        <button className={styles.botonEdit} onClick={onEditar}>
          <MdEdit />
          Editar
        </button>
        <button className={styles.botonDelete} onClick={onEliminar}>
          <MdDelete />
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Task;
