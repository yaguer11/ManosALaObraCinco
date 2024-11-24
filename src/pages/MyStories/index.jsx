import styles from "../../styles/MyStories.module.css";
import { useEffect, useState } from "react";
import { fetchStories } from "../../services/api";

function MyStories() {
  const [stories, setStories] = useState(null);

  useEffect(() => {
    fetchStories()
      .then((data) => setStories(data.data))
      .catch((error) => console.error("Error fetching stories:", error));
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
