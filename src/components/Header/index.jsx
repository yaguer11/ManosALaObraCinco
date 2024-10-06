import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/Header.module.css";

/* eslint-disable react/prop-types */
function Header({ title, showBack }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close the sidebar when clicking outside
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
      {showBack && (
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ‹
        </button>
      )}
      <button onClick={toggleMenu} className={styles.menuBtn}>
        ☰
      </button>
      <h1>{title}</h1>
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/my-projects">My Projects</Link>
          </li>
          <li>
            <Link to="/my-stories">My Stories</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
