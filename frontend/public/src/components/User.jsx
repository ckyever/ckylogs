import styles from "../styles/User.module.css";
import CommentList from "./CommentList.jsx";
import Navbar from "./Navbar.jsx";
import PostList from "./PostList.jsx";
import { useParams } from "react-router";

function User() {
  const { username } = useParams();
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h2>Profile - {username}</h2>
        <PostList endpoint={`post/author/${username}`} />
        <CommentList endpoint={`comment/user/${username}`} />
      </div>
    </>
  );
}

export default User;
