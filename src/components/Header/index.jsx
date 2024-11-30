import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Header/Header.module.scss";
import { MdArrowBack } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

/* eslint-disable react/prop-types */
function Header({ title, showBack }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickInicio = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(`.${styles.sidebar}`)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.buttonContainer}>
        <button onClick={toggleMenu} className={styles.menuBtn}>
          ☰
        </button>
        {showBack && (
          <button onClick={() => navigate(-1)} className={styles.backBtn}>
            <MdArrowBack />
          </button>
        )}
      </div>
      <h1>{title}</h1>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles.logoContainer}>
          <FaRegCheckCircle
            className={`${styles.logo} ${styles.animatedLogo}`}
          />
        </div>
        <ul className={styles.topLinks}>
          <li>
            <Link to="/" onClick={handleClickInicio}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/my-projects">Mis Proyectos</Link>
          </li>
          <li>
            <Link to="/my-stories">Mis Historias</Link>
          </li>
        </ul>
        <ul className={styles.bottomLinks}>
          <li>
            <Link to="/settings">Ajustes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
