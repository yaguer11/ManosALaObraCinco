import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/auth";
import styles from "../Register/Register.module.scss";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: { first: "", last: "" },
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "first" || name === "last") {
      setFormData({
        ...formData,
        name: { ...formData.name, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    registerUser(formData)
      .then(() => {
        setSuccessMessage("Usuario registrado exitosamente. Redirigiendo...");
        setTimeout(() => navigate("/login"), 2000); // Redirige tras 2 segundos
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Registrarse</h1>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="first"
          placeholder="Nombre"
          value={formData.name.first}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="last"
          placeholder="Apellido"
          value={formData.name.last}
          onChange={handleChange}
          required
        />

        {error && <p className={styles.error}>{error}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
        <button type="submit" className={styles.button}>
          Registrarse
        </button>
        <p className={styles.registerLink}>
          ¿Ya tienes una cuenta? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
