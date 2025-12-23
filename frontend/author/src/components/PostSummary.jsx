import LikeButton from "./LikeButton.jsx";
import styles from "../styles/PostSummary.module.css";
import Timestamp from "./Timestamp.jsx";
import { Link } from "react-router";
import Username from "./Username.jsx";

function PostSummary({ id, title, author, createdOn, body, userLikes }) {
  return (
    <div className={styles.container}>
      <Link to={`/post/${id}`} className={styles.postLink} />
      <div className={styles.card}>
        {author && (
          <div className={styles.details}>
            <Username username={author} />
            <Timestamp dateTime={createdOn} />
          </div>
        )}
        <div className={styles.title}>
          <h2>{title}</h2>
          {!author && <Timestamp dateTime={createdOn} />}
        </div>
        <p>{body}</p>
        <LikeButton postId={id} userLikes={userLikes} />
      </div>
    </div>
  );
}

export default PostSummary;
