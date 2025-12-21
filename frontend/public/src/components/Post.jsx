import CommentList from "./CommentList.jsx";
import Navbar from "./Navbar.jsx";
import postStyles from "../styles/PostSummary.module.css";
import styles from "../styles/Post.module.css";
import Timestamp from "./Timestamp.jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

function Post() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post/${id}`
        );
        const data = await response.json();
        setPost(data.post);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [id]);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div className={postStyles.card}>
              <h2>{post.title}</h2>
              <div>
                <span>{post.author.username}</span>{" "}
                <Timestamp dateTime={post.created_on} />
              </div>
              <p>{post.body}</p>
            </div>
            <CommentList endpoint={`post/${id}/comments`} postId={post.id} />
          </>
        )}
      </div>
    </>
  );
}

export default Post;
