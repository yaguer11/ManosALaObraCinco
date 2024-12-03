import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Settings/Settings.module.scss";
import Loader from "../../components/Loader";
import Alert from "../../components/Alert";
import { updateProfile } from "../../services/user";

function Settings() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    username: "",
  });
  const [alert, setAlert] = useState({
    visible: false,
    message: "",
    type: "success",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    if (userData) {
      setUser(userData);
      setFormData({
        first: userData.name.first || "",
        last: userData.name.last || "",
        email: userData.email || "",
        username: userData.username || "",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData)
      .then((updatedUser) => {
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setAlert({
          visible: true,
          message: "Perfil actualizado con éxito.",
          type: "success",
        });
      })
      .catch((err) =>
        setAlert({
          visible: true,
          message: "Error al actualizar el perfil: " + err.message,
          type: "error",
        })
      );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
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
      <h1 className={styles.title}>Editar información de usuario</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="first">Nombre:</label>
        <input
          type="text"
          name="first"
          value={formData.first}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="last">Apellido:</label>
        <input
          type="text"
          name="last"
          value={formData.last}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.updateButton}>
            Actualizar perfil
          </button>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Cerrar sesión
          </button>
        </div>
      </form>
      {alert.visible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ visible: false })}
        />
      )}
    </div>
  );
}

export default Settings;
