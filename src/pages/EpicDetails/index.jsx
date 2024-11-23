import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../../styles/EpicDetails.module.css";

function EpicDetails() {
  const { projectId, epicId } = useParams();
  const [epic, setEpic] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}`,
      {
        headers: { Auth: `${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => setEpic(data.data))
      .catch((error) => console.error("Error fetching epic:", error));

    fetch(
      `https://lamansysfaketaskmanagerapi.onrender.com/api/epics/${epicId}/stories`,
      {
        headers: { Auth: `${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => setStories(data.data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, [epicId]);

  if (!epic) return <div>Cargando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{epic.name}</h1>
      <p className={styles.description}>{epic.description}</p>
      <div className={styles.storyList}>
        {stories.map((story) => (
          <Link
            to={`/my-projects/${projectId}/epics/${epicId}/story/${story._id}`}
            key={story._id}
            className={styles.storyCard}
          >
            <h2>{story.name}</h2>
            <p>{story.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EpicDetails;
