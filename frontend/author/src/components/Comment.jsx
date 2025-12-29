import styles from "../styles/Comment.module.css";
import Timestamp from "./Timestamp.jsx";
import { Link } from "react-router";
import Username from "./Username.jsx";

function Comment({ postId, postTitle, user, createdOn, text, handleDelete }) {
  return (
    <>
      <div className={styles.commentHeader}>
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
          {user && <Username username={user} />}
          <Timestamp dateTime={createdOn} />
        </div>
        {<button onClick={handleDelete}>Delete</button>}
      </div>
      <div className={styles.commentText}>{text}</div>
    </>
  );
}

export default Comment;
