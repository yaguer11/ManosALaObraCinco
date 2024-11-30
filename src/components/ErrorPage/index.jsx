import styles from "./ErrorPage.module.scss";
import errorImage from "../../assets/404_robot.png";

function ErrorPage() {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.title}>¡Página no encontrada!</h1>
      <p className={styles.message}>
        Encontraste un bug... ¡no se puede todo! 🚧
      </p>
      <img src={errorImage} alt="Error 404" className={styles.image} />
      <p className={styles.footer}>A seguir laburando 🛠️</p>
    </div>
  );
}

export default ErrorPage;
