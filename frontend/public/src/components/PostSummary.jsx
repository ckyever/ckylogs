import styles from "../styles/PostSummary.module.css";
import Timestamp from "./Timestamp.jsx";
import { Link } from "react-router";

function PostSummary({ id, title, author, createdOn, body }) {
  return (
    <div className={styles.container}>
      <Link to={`/post/${id}`} className={styles.postLink} />
      <div className={styles.card}>
        {author && (
          <div className={styles.details}>
            <Link to={`/user/${author}`} className={styles.authorLink}>
              {author}
            </Link>
            <Timestamp dateTime={createdOn} />
          </div>
        )}
        <div className={styles.title}>
          <h2>{title}</h2>
          {!author && <Timestamp dateTime={createdOn} />}
        </div>
        <p>{body}</p>
      </div>
    </div>
  );
}

export default PostSummary;
