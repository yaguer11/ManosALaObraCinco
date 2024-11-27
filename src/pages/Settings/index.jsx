import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Settings/Settings.module.scss";
import Loader from "../../components/Loader";

function Settings() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token
    localStorage.removeItem("user"); // Elimina los datos del usuario
    navigate("/login"); // Redirige a la página de login
  };

  if (!user) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.title}>Información de usuario</h1>
      <div className={styles.userInfo}>
        <p>
          <strong>Nombre:</strong> {user.name.first}
        </p>
        <p>
          <strong>Apellido:</strong> {user.name.last}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Nombre de usuario:</strong> {user.username}
        </p>
      </div>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Cerrar sesión
      </button>
    </div>
  );
}

export default Settings;
