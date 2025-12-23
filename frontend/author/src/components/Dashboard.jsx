import styles from "../styles/Dashboard.module.css";
import Navbar from "./Navbar.jsx";
import PostList from "./PostList.jsx";
import { useOutletContext } from "react-router";

function Dashboard() {
  const { username } = useOutletContext();

  return (
    <div className={styles.page}>
      <Navbar />
      <h2>Dashboard</h2>
      <PostList endpoint={`post/author/${username}`} />
    </div>
  );
}

export default Dashboard;
