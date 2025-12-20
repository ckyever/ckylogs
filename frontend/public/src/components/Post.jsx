import Navbar from "./Navbar.jsx";
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
      <div className="post">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              <h2>{post.title}</h2>
              <div>
                <span>{post.author.username}</span>{" "}
                <span>{post.created_on}</span>
              </div>
              <p>{post.body}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Post;
