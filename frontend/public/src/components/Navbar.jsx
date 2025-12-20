import styles from "../styles/Navbar.module.css";
import Logout from "./Logout.jsx";
import { Link, useOutletContext } from "react-router";

function Navbar() {
  const { username } = useOutletContext();

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h1>Ckylogs</h1>
      </Link>
      <nav>
        <ul>
          <li className={styles.link}>
            {username && <div>{username}</div>}
            {username ? <Logout></Logout> : <Link to="/login">Login</Link>}
          </li>
        </ul>
      </nav>
    </nav>
  );
}

export default Navbar;
