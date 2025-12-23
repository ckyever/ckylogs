import styles from "../styles/Dashboard.module.css";
import Navbar from "./Navbar.jsx";
import PostList from "./PostList.jsx";

function Dashboard() {
  return (
    <div className={styles.page}>
      <Navbar />
      <h2>Dashboard</h2>
      <PostList endpoint="post" />
    </div>
  );
}

export default Dashboard;
