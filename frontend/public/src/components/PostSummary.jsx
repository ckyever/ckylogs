import styles from "../styles/PostSummary.module.css";
import Timestamp from "./Timestamp.jsx";
import { Link } from "react-router";

function PostSummary({ id, title, author, createdOn, body }) {
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        <Link to={`/user/${author}`}>{author}</Link>
        <Timestamp dateTime={createdOn} />
      </div>
      <Link to={`/post/${id}`}>
        <h2>{title}</h2>
      </Link>
      <Link to={`/post/${id}`}>
        <p>{body}</p>
      </Link>
    </div>
  );
}

export default PostSummary;
