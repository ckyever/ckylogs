import styles from "../styles/Username.module.css";
import { useOutletContext } from "react-router";

function Username({ username }) {
  const { username: currentUsername } = useOutletContext();
  const isCurrentUser = currentUsername === username;
  return (
    <span
      className={`${styles.username} ${
        isCurrentUser ? styles.currentUser : null
      }`}
    >
      {username}
    </span>
  );
}

export default Username;
