import styles from "../styles/PostList.module.css";
import PostSummary from "./PostSummary.jsx";
import { useEffect, useState } from "react";

function PostList({ endpoint, newPostCount }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [deleteCount, setDeleteCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/${endpoint}`
        );
        const data = await response.json();
        setPosts(data.posts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [endpoint, newPostCount, deleteCount]);

  return (
    <div className={styles.feed}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul className={styles.postList}>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <PostSummary
                  id={post.id}
                  title={post.title}
                  createdOn={post.created_on}
                  body={post.body}
                  userLikes={post.user_likes}
                  setDeleteCount={setDeleteCount}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PostList;
