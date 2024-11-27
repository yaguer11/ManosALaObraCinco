import styles from "../DeleteDialog/DeleteDialog.module.scss";

/* eslint-disable react/prop-types */
function DeleteDialog({ isOpen, onClose, onConfirm, message, isLoading }) {
  if (!isOpen) return null;

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <h2>Eliminar</h2>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button
            className={styles.cancelar}
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </button>
          <button
            className={styles.eliminar}
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteDialog;
