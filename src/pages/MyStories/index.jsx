import styles from "../MyStories/MyStories.module.scss";
import { useEffect, useState } from "react";
import { fetchStories } from "../../services/api";
import Loader from "../../components/Loader";

function MyStories() {
  const [stories, setStories] = useState(null);

  useEffect(() => {
    fetchStories()
      .then((data) => {
        setStories(data.data);
      })
      .catch((error) => console.error("Error fetching stories:", error));
  }, []);

  if (!stories)
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
            <h2>{story.title}</h2>
            <p>
              <strong>Nombre:</strong> {story.name}
            </p>
            <p>
              <strong>Descripción:</strong> {story.description}
            </p>
            <p>
              <strong>Épica:</strong> {story.epic.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyStories;
