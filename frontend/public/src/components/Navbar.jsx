import Logout from "./Logout.jsx";
import { Link, useOutletContext } from "react-router";

function Navbar() {
  const { username } = useOutletContext();

  return (
    <nav>
      <Link to="/">
        <h1>Ckylogs</h1>
      </Link>
      <nav>
        <ul>
          <li>
            {username && <div>Welcome {username}</div>}
            {username ? <Logout></Logout> : <Link to="/login">Login</Link>}
          </li>
        </ul>
      </nav>
    </nav>
  );
}

export default Navbar;
