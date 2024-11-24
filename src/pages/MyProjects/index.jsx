import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/MyProjects.module.css";
import { fetchProjects } from "../../services/api";

function MyProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data.data);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
      });
  }, []);

  if (!projects) return <div>Cargando...</div>;

  return (
    <div className={styles.projectList}>
      {projects.map((project) => (
        <Link
          to={`/my-projects/${project._id}`}
          key={project._id}
          className={styles.projectCard}
        >
          <div>
            <h2>{project.name}</h2>
            <p>{project.description || "Descripción no disponible"}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MyProjects;
