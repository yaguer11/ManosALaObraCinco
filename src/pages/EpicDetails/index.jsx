import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../EpicDetails/EpicDetails.module.scss";
import { fetchEpicDetails, fetchStoriesByEpic } from "../../services/api";
import Loader from "../../components/Loader";

function EpicDetails() {
  const { projectId, epicId } = useParams();
  const [epic, setEpic] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchEpicDetails(epicId)
      .then((data) => {
        setEpic(data);
      })
      .catch((error) => console.error("Error fetching epic:", error));

    fetchStoriesByEpic(epicId)
      .then((data) => setStories(data.data))
      .catch((error) => console.error("Error fetching stories:", error));
  }, [epicId]);

  if (!epic)
    return (
      <div>
        <Loader />
      </div>
    );

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
