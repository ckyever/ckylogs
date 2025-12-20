import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import { Link, useOutletContext } from "react-router";

function CommentForm({ postId, setCommentCount }) {
  const [comment, setComment] = useState("");
  const [commentResult, setCommentResult] = useState("");
  const { userToken, username } = useOutletContext();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setCommentResult("Submitting...");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comment/post/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ text: comment }),
        }
      );

      if (response.status === StatusCodes.UNAUTHORIZED) {
        setCommentResult(
          "You are not authorized to leave a comment on this post"
        );
        return;
      }

      if (!response.ok) {
        setCommentResult("Something went wrong");
        throw new Error(`Response status: ${response.status}`);
      }
      setComment("");
      setCommentResult("");
      setCommentCount((prev) => prev + 1);
    } catch (error) {
      setCommentResult("Failed to submit comment");
      console.error(error);
    }
  };

  return (
    <>
      {username ? (
        <form onSubmit={(event) => handleSubmit(event)}>
          <textarea
            name="comment"
            aria-label="comment text"
            placeholder="Write something nice..."
            required
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
          <button type="submit">Comment</button>
          <div>{commentResult}</div>
        </form>
      ) : (
        <div>
          <Link to="/login">Login</Link> to leave a comment
        </div>
      )}
    </>
  );
}

export default CommentForm;
