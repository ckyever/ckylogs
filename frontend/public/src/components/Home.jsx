import Logout from "./Logout.jsx";
import Navbar from "./Navbar.jsx";
import PostList from "./PostList.jsx";
import { Link, useOutletContext } from "react-router";

function Home() {
  const { username } = useOutletContext();

  return (
    <>
      <Navbar />
      <div className="home">
        <h2>Home Page</h2>
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
    </>
  );
}

export default Home;
