import Comment from "./Comment.jsx";
import styles from "../styles/CommentList.module.css";
import { StatusCodes } from "http-status-codes";
import postStyles from "../styles/PostSummary.module.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";

function CommentList({ endpoint }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);

  const { userToken } = useOutletContext();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/${endpoint}`
        );
        const data = await response.json();
        setComments(data.comments);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [endpoint, deleteCount]);

  return (
    <div className={postStyles.card}>
      <h3>Comments</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className={styles.commentList}>
          {comments.map((comment) => {
            const handleDelete = async () => {
              try {
                const response = await fetch(
                  `${import.meta.env.VITE_API_URL}/api/comment/${comment.id}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${userToken}`,
                    },
                  }
                );

                if (response.status === StatusCodes.UNAUTHORIZED) {
                  console.error(
                    "You are not authorised to delete this comment"
                  );
                  return;
                }

                if (!response.ok) {
                  console.error("Something went wrong");
                  throw new Error(`Response status: ${response.status}`);
                }

                setDeleteCount((prev) => prev + 1);
              } catch (error) {
                console.error(error);
              }
            };

            return (
              <li key={comment.id} className={styles.comment}>
                <Comment
                  postId={comment.post && comment.post.id}
                  postTitle={comment.post && comment.post.title}
                  user={comment.user && comment.user.username}
                  createdOn={comment.created_on}
                  text={comment.text}
                  handleDelete={handleDelete}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CommentList;
