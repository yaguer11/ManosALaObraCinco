import styles from "../../styles/Home.module.css";

function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>
        Bienvenido a la App de Gestión de Proyectos
      </h1>
      <div className={styles.fondoDegradado}></div>
      <p className={styles.description}>
        Esta aplicación te ayuda a gestionar tus proyectos, épicas e historias
        de usuario de manera eficiente. Explora tus proyectos, consulta las
        historias de cada épica y mantén todo organizado desde un solo lugar.
      </p>
    </div>
  );
}

export default Home;
