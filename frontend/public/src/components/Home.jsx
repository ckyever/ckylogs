import styles from "../styles/Home.module.css";
import Navbar from "./Navbar.jsx";
import PostList from "./PostList.jsx";

function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <h2>Latest Logs</h2>
      <PostList endpoint="post" />
    </div>
  );
}

export default Home;
