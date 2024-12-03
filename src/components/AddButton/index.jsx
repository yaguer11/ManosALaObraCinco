import PropTypes from "prop-types";
import styles from "../AddButton/AddButton.module.scss";
import { MdOutlineAdd } from "react-icons/md";

function AddButton({ onClick, text }) {
  return (
    <button className={styles.addButton} onClick={onClick}>
      <MdOutlineAdd className={styles.icon} />
      {text}
    </button>
  );
}

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AddButton;
