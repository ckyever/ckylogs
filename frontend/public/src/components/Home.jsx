import Logout from "./Logout.jsx";
import PostList from "./PostList.jsx";
import { Link, useOutletContext } from "react-router";

function Home() {
  const { username } = useOutletContext();

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
      <PostList endpoint="post" />
    </div>
  );
}

export default Home;
