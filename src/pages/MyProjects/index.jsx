import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/MyProjects.module.css";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("https://lamansysfaketaskmanagerapi.onrender.com/api/projects", {
      headers: { Auth: `${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setProjects(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

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
