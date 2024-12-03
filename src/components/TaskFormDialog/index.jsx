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
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dueDate: "",
    done: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : "",
        done: initialData.done || false,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
          <label htmlFor="name">Nombre</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ingrese nombre"
            required
          />
          <label htmlFor="description">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ingrese descripción"
            required
          />
          <div className={styles.inputRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="dueDate">Fecha de vencimiento</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className={styles.inputField}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label htmlFor="done">Completada</label>
              <input
                type="checkbox"
                name="done"
                checked={formData.done}
                onChange={handleChange}
              />
            </div>
          </div>

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
