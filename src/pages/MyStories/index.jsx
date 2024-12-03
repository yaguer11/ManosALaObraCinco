import styles from "../MyStories/MyStories.module.scss";
import { useEffect, useState } from "react";
import { fetchStories } from "../../services/stories";
import Loader from "../../components/Loader";

function MyStories() {
  const [stories, setStories] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchStories()
      .then((data) => {
        setStories(data.data);
      })
      .catch((error) => console.error("Error al recuperar historias:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  return (
    <div className={styles.storiesContainer}>
      <h1 className={styles.title}>Listado de historias</h1>
      <ul className={styles.storyList}>
        {stories.map((story) => (
          <li key={story._id} className={styles.storyItem}>
            <p>
              <strong>Nombre:</strong> {story.name}
            </p>
            <p>
              <strong>Descripción:</strong> {story.description}
            </p>
            <p>
              <strong>Épica:</strong> {story.epic.name}
            </p>
            <p>
              <strong>Estado:</strong> {getStatusLabel(story.status)}
            </p>
            <p>
              <strong>Puntos:</strong> {story.points}
            </p>
            <p>
              <strong>Creado:</strong>{" "}
              {new Date(story.created).toLocaleDateString()}
            </p>
            {story.owner && (
              <p>
                <strong>Propietario:</strong> {story.owner.name.first}{" "}
                {story.owner.name.last}
              </p>
            )}
            {story.assignedTo.length > 0 && (
              <p>
                <strong>Asignado a:</strong>{" "}
                {story.assignedTo
                  .map((user) => `${user.name.first} ${user.name.last}`)
                  .join(", ")}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyStories;
