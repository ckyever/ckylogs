import CommentList from "./CommentList.jsx";
import LikeButton from "./LikeButton.jsx";
import Navbar from "./Navbar.jsx";
import postStyles from "../styles/PostSummary.module.css";
import styles from "../styles/Post.module.css";
import Timestamp from "./Timestamp.jsx";
import { useEffect, useState } from "react";
import { redirect, useOutletContext, useParams } from "react-router";

function Post() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { userId } = useOutletContext();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post/${id}`
        );
        const data = await response.json();

        if (!data.post) {
          setError(new Error("This post doesn't exist"));
          return;
        }

        if (data.post.author_id != userId) {
          setError(new Error("User is not authorised to view this post"));
          return;
        }

        setPost(data.post);
        setPostTitle(data.post.title);
        setPostBody(data.post.body);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id, userId]);

  if (error) {
    throw error;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setCommentResult("Submitting...");
    // try {
    //   const response = await fetch(
    //     `${import.meta.env.VITE_API_URL}/api/comment/post/${postId}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${userToken}`,
    //       },
    //       body: JSON.stringify({ text: comment }),
    //     }
    //   );

    //   if (response.status === StatusCodes.UNAUTHORIZED) {
    //     setCommentResult(
    //       "You are not authorized to leave a comment on this post"
    //     );
    //     return;
    //   }

    //   if (!response.ok) {
    //     setCommentResult("Something went wrong");
    //     throw new Error(`Response status: ${response.status}`);
    //   }
    //   setComment("");
    //   setCommentResult("");
    //   setCommentCount((prev) => prev + 1);
    // } catch (error) {
    //   setCommentResult("Failed to submit comment");
    //   console.error(error);
    // }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className={postStyles.card}>
              <form
                className={styles.form}
                onSubmit={(event) => handleSubmit(event)}
              >
                <h2>
                  <input
                    type="text"
                    name="title"
                    aria-label="post title"
                    placeholder="Eye-catching title"
                    required
                    value={postTitle}
                    onChange={(event) => setPostTitle(event.target.value)}
                  />
                </h2>
                <div className={styles.postDetails}>
                  <Timestamp dateTime={post.created_on} />
                </div>
                <textarea
                  name="body"
                  aria-label="post body"
                  placeholder="Write something interesting..."
                  required
                  value={postBody}
                  onChange={(event) => setPostBody(event.target.value)}
                  rows="10"
                ></textarea>
                <div>
                  <button type="submit">Update</button>
                  <button type="reset">Cancel</button>
                </div>
              </form>
              <LikeButton
                postId={post.id}
                userLikes={post.user_likes}
                viewOnly={false}
              />
            </div>
            <CommentList endpoint={`post/${id}/comments`} postId={post.id} />
          </>
        )}
      </div>
    </>
  );
}

export default Post;
