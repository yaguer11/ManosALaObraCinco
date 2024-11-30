import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "../EpicDetails/EpicDetails.module.scss";
import {
  fetchStoriesByEpic,
  createStory,
  updateStory,
  deleteStory,
} from "../../services/stories";
import { fetchEpicDetails } from "../../services/epics";
import Modal from "../../components/Modal";
import Alert from "../../components/Alert";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import DeleteDialog from "../../components/DeleteDialog";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function EpicDetails() {
  const { projectId, epicId } = useParams();
  const navigate = useNavigate();

  const [epic, setEpic] = useState(null);
  const [stories, setStories] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const [storyName, setStoryName] = useState("");
  const [storyDescription, setStoryDescription] = useState("");
  const [editingStory, setEditingStory] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingStory, setDeletingStory] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ visible: true, message, type });
    setTimeout(
      () => setAlert({ visible: false, message: "", type: "success" }),
      3000
    );
  };

  useEffect(() => {
    fetchEpicDetails(epicId)
      .then(setEpic)
      .catch((error) => showAlert(error.message, "error"));

    fetchStoriesByEpic(epicId)
      .then((data) => setStories(data.data))
      .catch((error) => showAlert(error.message, "error"));
  }, [epicId]);

  const handleAddStory = () => {
    setEditingStory(null);
    setStoryName("");
    setStoryDescription("");
    setModalOpen(true);
  };

  const handleEditStory = (story) => {
    setEditingStory(story);
    setStoryName(story.name);
    setStoryDescription(story.description);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setStoryName("");
    setStoryDescription("");
    setEditingStory(null);
  };

  const handleSubmitStory = (e) => {
    e.preventDefault();
    const storyData = {
      name: storyName,
      description: storyDescription,
      epic: epicId,
    };

    const action = editingStory
      ? updateStory(editingStory._id, storyData)
      : createStory(storyData);

    action
      .then(() => {
        showAlert(
          editingStory ? "Historia actualizada." : "Historia creada.",
          "success"
        );
        return fetchStoriesByEpic(epicId);
      })
      .then((data) => setStories(data.data))
      .catch((error) => showAlert(error.message, "error"))
      .finally(closeModal);
  };

  const handleDeleteDialogOpen = (storyId) => {
    setDeleteDialogOpen(true);
    setDeletingStory(storyId);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setDeletingStory(null);
  };

  const confirmDeleteStory = () => {
    deleteStory(deletingStory)
      .then(() => {
        showAlert("Historia eliminada.", "error");
        setStories((prev) => prev.filter((s) => s._id !== deletingStory));
      })
      .catch((error) => showAlert(error.message, "error"))
      .finally(() => handleDeleteDialogClose());
  };

  if (!epic)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.name}>{epic.name}</h1>
        <p className={styles.description}>{epic.description}</p>
        <button className={styles.addButton} onClick={handleAddStory}>
          Agregar Historia
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>{editingStory ? "Editar Historia" : "Agregar Historia"}</h2>
          <form onSubmit={handleSubmitStory} className={styles.form}>
            <input
              type="text"
              placeholder="Nombre de la historia"
              value={storyName}
              onChange={(e) => setStoryName(e.target.value)}
              required
              className={styles.inputField}
            />
            <textarea
              placeholder="Descripción de la historia"
              value={storyDescription}
              onChange={(e) => setStoryDescription(e.target.value)}
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
                {editingStory ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </Modal>
        <div className={styles.storyList}>
          {stories.map((story) => (
            <Card
              key={story._id}
              title={story.name}
              description={story.description || "Sin descripción"}
              onClick={() =>
                navigate(
                  `/my-projects/${projectId}/epics/${epicId}/story/${story._id}`
                )
              }
            >
              <button
                className={styles.botonEdit}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditStory(story);
                }}
              >
                <MdEdit />
                Editar
              </button>
              <button
                className={styles.botonDelete}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteDialogOpen(story._id);
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
        onConfirm={confirmDeleteStory}
        message="¿Estás seguro de que deseas eliminar esta historia?"
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

export default EpicDetails;
