import LikeButton from "./LikeButton.jsx";
import styles from "../styles/PostSummary.module.css";
import { StatusCodes } from "http-status-codes";
import Timestamp from "./Timestamp.jsx";
import { Link, useOutletContext } from "react-router";

function PostSummary({
  id,
  title,
  createdOn,
  body,
  userLikes,
  setDeleteCount,
}) {
  const { userToken } = useOutletContext();

  const handleDelete = async (postId) => {
    console.log("Post ID - " + postId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/post/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === StatusCodes.UNAUTHORIZED) {
        console.error("You are not authorised to delete this post");
        return;
      }

      if (!response.ok) {
        console.error("Something went wrong with deleting this post");
        throw new Error(`Response status: ${response.status}`);
      }
      setDeleteCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <Link to={`/post/${id}`} className={styles.postLink} />
      <div className={styles.card}>
        <div className={styles.title}>
          <h2>{title}</h2>
          <div className={styles.titleRightSide}>
            <Timestamp dateTime={createdOn} />
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
        </div>
        <p className={styles.body}>{body}</p>
        <LikeButton postId={id} userLikes={userLikes} />
      </div>
    </div>
  );
}

export default PostSummary;
