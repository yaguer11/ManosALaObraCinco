import styles from "../../styles/Task.module.css";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

/* eslint-disable react/prop-types */
const Task = ({ texto, onEditar, onEliminar }) => {
  return (
    <div className={styles.tarea}>
      <span>{texto}</span>
      <div className={styles.acciones}>
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
