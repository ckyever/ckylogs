import LikeButton from "./LikeButton.jsx";
import styles from "../styles/PostSummary.module.css";
import Timestamp from "./Timestamp.jsx";
import { Link } from "react-router";

function PostSummary({ id, title, createdOn, body, userLikes }) {
  return (
    <div className={styles.container}>
      <Link to={`/post/${id}`} className={styles.postLink} />
      <div className={styles.card}>
        <div className={styles.title}>
          <h2>{title}</h2>
          <Timestamp dateTime={createdOn} />
        </div>
        <p>{body}</p>
        <LikeButton postId={id} userLikes={userLikes} />
      </div>
    </div>
  );
}

export default PostSummary;
