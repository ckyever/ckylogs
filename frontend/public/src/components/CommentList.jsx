import Comment from "./Comment.jsx";
import CommentForm from "./CommentForm.jsx";
import { useEffect, useState } from "react";

function CommentList({ endpoint, postId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

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
  }, [endpoint, commentCount]);

  return (
    <div>
      <h3>Comments</h3>
      <CommentForm postId={postId} setCommentCount={setCommentCount} />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <Comment
                  postId={comment.post && comment.post.id}
                  postTitle={comment.post && comment.post.title}
                  user={comment.user && comment.user.username}
                  createdOn={comment.created_on}
                  text={comment.text}
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
