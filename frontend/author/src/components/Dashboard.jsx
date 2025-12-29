import styles from "../styles/Dashboard.module.css";
import Navbar from "./Navbar.jsx";
import NewPost from "./NewPost.jsx";
import PostList from "./PostList.jsx";
import { useState } from "react";
import { useOutletContext } from "react-router";

function Dashboard() {
  const [newPostCount, setNewPostCount] = useState(0);
  const { username } = useOutletContext();

  return (
    <div className={styles.page}>
      <Navbar />
      <h2>Dashboard</h2>
      <NewPost setNewPostCount={setNewPostCount} />
      <PostList
        endpoint={`post/author/${username}`}
        newPostCount={newPostCount}
      />
    </div>
  );
}

export default Dashboard;
