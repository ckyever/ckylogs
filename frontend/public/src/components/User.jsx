import PostList from "./PostList.jsx";
import { useParams } from "react-router";

function User() {
  const { username } = useParams();
  return (
    <div className="user">
      <h2>{username}</h2>
      <PostList endpoint={`post/author/${username}`} />
    </div>
  );
}

export default User;
