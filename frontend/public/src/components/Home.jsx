import { Link, useOutletContext } from "react-router";

function Home() {
  const { username } = useOutletContext();

  return (
    <div className="home">
      <h2>Home Page</h2>
      {username && <div>Welcome {username}</div>}
      <nav>
        {!username && (
          <ul>
            <Link to="login">Login</Link>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Home;
