import Comment from "./Comment.jsx";
import { useEffect, useState } from "react";

function CommentList({ endpoint }) {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);

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
  }, [endpoint]);

  return (
    <div>
      <h3>Comments</h3>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {comments.map((comment) => {
            console.log(comment);
            return (
              <li key={comment.id}>
                <Comment
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
