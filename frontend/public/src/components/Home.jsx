import Logout from "./Logout.jsx";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useOutletContext();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/post`
        );
        const data = await response.json();
        setPosts(data.posts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="home">
      <h1>Home Page</h1>
      {username && <div>Welcome {username}</div>}
      <nav>
        {username ? (
          <Logout></Logout>
        ) : (
          <ul>
            <Link to="login">Login</Link>
          </ul>
        )}
      </nav>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {posts.map((post) => {
            return (
              <li>
                <h2>{post.title}</h2>
                <span>{post.created_on}</span>
                <p>{post.body}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Home;
