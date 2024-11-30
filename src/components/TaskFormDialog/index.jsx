import { useState, useEffect } from "react";
import styles from "../TaskFormDialog/TaskFormDialog.module.scss";

/* eslint-disable react/prop-types */
const TaskFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2>{initialData ? "Editar tarea" : "Nueva tarea"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <div className={styles.conteinerButtons}>
            <button
              className={styles.cancelar}
              type="button"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              className={styles.guardar}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormDialog;
