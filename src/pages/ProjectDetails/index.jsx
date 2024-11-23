import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "../../styles/ProjectDetails.module.css";

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [epics, setEpics] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(
      `https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}`,
      {
        headers: { Auth: `${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => setProject(data.data))
      .catch((error) => console.error("Error fetching project:", error));

    fetch(
      `https://lamansysfaketaskmanagerapi.onrender.com/api/projects/${projectId}/epics`,
      {
        headers: { Auth: `${token}` },
      }
    )
      .then((response) => response.json())
      .then((data) => setEpics(data.data))
      .catch((error) => console.error("Error fetching epics:", error));
  }, [projectId]);

  if (!project) return <div>Cargando...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.projectName}>{project.name}</h1>
      <p className={styles.projectDescription}>{project.description}</p>
      <div className={styles.epicList}>
        {epics.map((epic) => (
          <Link
            to={`/my-projects/${projectId}/epics/${epic._id}`}
            key={epic._id}
            className={styles.epicCard}
          >
            <h2>{epic.name}</h2>
            <p>{epic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProjectDetails;
