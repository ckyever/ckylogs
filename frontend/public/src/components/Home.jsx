import { Link } from "react-router";

function Home() {
  return (
    <div className="home">
      <h2>Home Page</h2>
      <nav>
        <ul>
          <Link to="login">Login</Link>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
