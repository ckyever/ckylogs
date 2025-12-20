import styles from "../styles/PostList.module.css";
import PostSummary from "./PostSummary.jsx";
import { useEffect, useState } from "react";

function PostList({ endpoint }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

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
  }, [endpoint]);

  return (
    <div className={styles.feed}>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                <PostSummary
                  id={post.id}
                  title={post.title}
                  author={post.author && post.author.username}
                  createdOn={post.created_on}
                  body={post.body}
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
