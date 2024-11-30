import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../ProjectDetails/ProjectDetails.module.scss";
import {
  fetchEpics,
  createEpic,
  updateEpic,
  deleteEpic,
} from "../../services/epics";
import { fetchProjectDetails } from "../../services/projects";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import DeleteDialog from "../../components/DeleteDialog";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function ProjectDetails() {
  const { projectId } = useParams();
  const [currentProject, setProject] = useState(null);
  const [epics, setEpics] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [epicName, setEpicName] = useState("");
  const [epicDescription, setEpicDescription] = useState("");
  const [editingEpic, setEditingEpic] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingEpic, setDeletingEpic] = useState(null);
  const navigate = useNavigate();

  const showAlert = (message, type) => {
    setAlert({ visible: true, message, type });
    setTimeout(
      () => setAlert({ visible: false, message: "", type: "success" }),
      3000
    );
  };

  useEffect(() => {
    fetchProjectDetails(projectId)
      .then(setProject)
      .catch((error) => showAlert(error.message, "error"));

    fetchEpics(projectId)
      .then((data) => setEpics(data.data))
      .catch((error) => showAlert(error.message, "error"));
  }, [projectId]);

  const handleAddEpic = () => {
    setEditingEpic(null);
    setEpicName("");
    setEpicDescription("");
    setModalOpen(true);
  };

  const handleEditEpic = (epic) => {
    setEditingEpic(epic);
    setEpicName(epic.name);
    setEpicDescription(epic.description);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEpicName("");
    setEpicDescription("");
    setEditingEpic(null);
  };

  const handleSubmitEpic = (e) => {
    e.preventDefault();
    const icon = "icon-epic";
    const epicData = {
      name: epicName,
      description: epicDescription,
      project: projectId,
      icon,
    };

    const action = editingEpic
      ? updateEpic(editingEpic._id, epicData)
      : createEpic(epicData);
    action
      .then(() => {
        showAlert(
          editingEpic ? "Épica actualizada." : "Épica creada.",
          editingEpic ? "info" : "success"
        );
        return fetchEpics(projectId);
      })
      .then((data) => setEpics(data.data))
      .catch((error) => showAlert(error.message, "error"))
      .finally(closeModal);
  };

  const handleDeleteDialogOpen = (epicId) => {
    setDeleteDialogOpen(true);
    setDeletingEpic(epicId);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeletingEpic(null);
  };

  const confirmDeleteProject = () => {
    deleteEpic(deletingEpic)
      .then(() => {
        showAlert("Épica eliminada.", "error");
        setEpics((prev) => prev.filter((p) => p._id !== deletingEpic));
      })
      .catch((error) => showAlert(error.message, "error"))
      .finally(() => handleDeleteDialogClose());
  };

  if (!currentProject)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.projectName}>{currentProject.name}</h1>
        <p className={styles.projectDescription}>
          {currentProject.description}
        </p>
        <button className={styles.addButton} onClick={handleAddEpic}>
          Agregar Épica
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>{editingEpic ? "Editar Épica" : "Agregar Épica"}</h2>
          <form onSubmit={handleSubmitEpic} className={styles.form}>
            <input
              type="text"
              placeholder="Nombre de la épica"
              value={epicName}
              onChange={(e) => setEpicName(e.target.value)}
              required
              className={styles.inputField}
            />
            <textarea
              placeholder="Descripción de la épica"
              value={epicDescription}
              onChange={(e) => setEpicDescription(e.target.value)}
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
                {editingEpic ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </Modal>
        <div className={styles.epicList}>
          {epics.map((epic) => (
            <Card
              key={epic._id}
              title={epic.name}
              description={epic.description || "Sin descripción"}
              onClick={() =>
                navigate(`/my-projects/${projectId}/epics/${epic._id}`)
              }
            >
              <button
                className={styles.botonEdit}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditEpic(epic);
                }}
              >
                <MdEdit />
                Editar
              </button>
              <button
                className={styles.botonDelete}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDialogOpen(epic._id);
                }}
              >
                <MdDelete />
                Eliminar
              </button>
            </Card>
          ))}
        </div>
      </div>
      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={confirmDeleteProject}
        message="¿Estás seguro de que deseas eliminar esta epica?"
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

export default ProjectDetails;
