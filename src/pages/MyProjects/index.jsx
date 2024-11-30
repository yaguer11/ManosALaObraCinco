import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../MyProjects/MyProjects.module.scss";

import {
  fetchProjects,
  createProject,
  deleteProject,
  updateProject,
} from "../../services/projects";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Modal from "../../components/Modal";
import DeleteDialog from "../../components/DeleteDialog";
import Alert from "../../components/Alert";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [editingProject, setEditingProject] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);
  const handleAddProject = () => {
    setEditingProject(null); // No estamos editando
    setProjectName("");
    setProjectDescription("");
    setModalOpen(true);
  };

  const showAlert = (message, type) => {
    setAlert({ visible: true, message, type });
    setTimeout(
      () => setAlert({ visible: false, message: "", type: "success" }),
      3000
    ); // Ocultar después de 3 segundos
  };

  const handleEditProject = (project) => {
    setEditingProject(project); // Proyecto actual
    setProjectName(project.name);
    setProjectDescription(project.description);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setProjectName("");
    setProjectDescription("");
    setEditingProject(null);
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();

    const owner = JSON.parse(localStorage.getItem("user")).id;
    const members = [owner]; // Puedes ajustarlo si hay otros miembros
    const projectData = {
      name: projectName,
      description: projectDescription,
      owner,
      members,
    };

    const action = editingProject
      ? updateProject(editingProject._id, projectData)
      : createProject(projectData);

    action
      .then(() => {
        showAlert(
          editingProject ? "Proyecto actualizado." : "Proyecto creado.",
          editingProject ? "info" : "success"
        );
        return fetchProjects();
      })
      .then((data) => {
        setProjects(data.data);
      })
      .catch((error) => showAlert("Error al guardar el proyecto:", error))
      .finally(() => closeModal());
  };

  const handleDeleteDialogOpen = (projectId) => {
    setDeleteDialogOpen(true);
    setDeletingProject(projectId);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeletingProject(null);
  };

  const confirmDeleteProject = () => {
    deleteProject(deletingProject)
      .then(() => {
        showAlert("Proyecto eliminado", "error");
        setProjects((prev) => prev.filter((p) => p._id !== deletingProject));
      })
      .catch((error) => showAlert(error.message, "warning"))
      .finally(() => handleDeleteDialogClose());
  };

  if (!projects.length)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <>
      <button className={styles.addTaskButton} onClick={handleAddProject}>
        Agregar Proyecto
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>{editingProject ? "Editar Proyecto" : "Agregar Proyecto"}</h2>
        <form onSubmit={handleSubmitProject} className={styles.form}>
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className={styles.inputField}
            required
          />
          <textarea
            placeholder="Descripción del proyecto"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            className={styles.inputField}
          />
          <div className={styles.conteinerButtons}>
            <button
              type="button"
              className={styles.cancelar}
              onClick={closeModal}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.guardar}>
              {editingProject ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </Modal>
      <div className={styles.projectList}>
        {projects.map((project) => (
          <Card
            key={project._id}
            title={project.name}
            description={project.description || "Sin descripción"}
            onClick={() => navigate(`/my-projects/${project._id}`)}
          >
            <button
              className={styles.botonEdit}
              onClick={(e) => {
                e.stopPropagation();
                handleEditProject(project);
              }}
            >
              <MdEdit />
              Editar
            </button>
            <button
              className={styles.botonDelete}
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteDialogOpen(project._id);
              }}
            >
              <MdDelete />
              Eliminar
            </button>
          </Card>
        ))}
      </div>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={confirmDeleteProject}
        message="¿Estás seguro de que deseas eliminar este proyecto?"
      />
      {alert.visible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ visible: false })}
        />
      )}
    </>
  );
}

export default MyProjects;
