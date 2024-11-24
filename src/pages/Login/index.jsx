import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Login.module.css";
import { loginUser } from "../../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    loginUser(username, password)
      .then((data) => {
        localStorage.setItem("token", data.token); // Guarda el token
        localStorage.setItem("user", JSON.stringify(data.user)); // Guarda información del usuario
        navigate("/my-projects"); // Redirige después de iniciar sesión
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h1>Iniciar sesión</h1>
        <div>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputField}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
