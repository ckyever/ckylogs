import styles from "../styles/Username.module.css";
import { Link, useOutletContext } from "react-router";

function Username({ username }) {
  const { username: currentUsername } = useOutletContext();
  const isCurrentUser = currentUsername === username;
  return (
    <Link to={`/user/${username}`}>
      <span
        className={`${styles.username} ${
          isCurrentUser ? styles.currentUser : null
        }`}
      >
        {username}
      </span>
    </Link>
  );
}

export default Username;
