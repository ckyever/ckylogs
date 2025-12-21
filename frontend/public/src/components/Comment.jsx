import styles from "../styles/Comment.module.css";
import Timestamp from "./Timestamp.jsx";
import { Link } from "react-router";

function Comment({ postId, postTitle, user, createdOn, text }) {
  return (
    <>
      <div className={styles.commentDetails}>
        {postId && (
          <span>
            Commented on "
            <Link to={`/post/${postId}`} className={styles.title}>
              {postTitle}
            </Link>
            " -
          </span>
        )}
        {user && (
          <Link to={`/user/${user}`} className={styles.user}>
            {user}
          </Link>
        )}
        <Timestamp dateTime={createdOn} />
      </div>
      <div className={styles.commentText}>{text}</div>
    </>
  );
}

export default Comment;
