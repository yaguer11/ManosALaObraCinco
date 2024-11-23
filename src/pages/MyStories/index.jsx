import styles from "../../styles/MyStories.module.css";
import { useEffect, useState } from "react";

function MyStories() {
  const [stories, setStories] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://lamansysfaketaskmanagerapi.onrender.com/api/stories`, {
      headers: { Auth: `${token}` },
    })
      .then((response) => response.json())
      .then((data) => setStories(data.data))
      .catch((error) => console.error("Error fetching story:", error));
  }, []);

  if (!stories) return <div>Cargando...</div>;

  return (
    <div className={styles.storiesContainer}>
      <h1 className={styles.title}>Listado de historias</h1>
      <ul className={styles.storyList}>
        {stories.map((story) => (
          <li key={story._id} className={styles.storyItem}>
            <h2>{story.title}</h2>
            <p>
              <strong>Nombre:</strong> {story.name}
            </p>
            <p>
              <strong>Épica:</strong> {story.epic}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyStories;
