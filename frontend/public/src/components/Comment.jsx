import { Link } from "react-router";

function Comment({ postId, postTitle, user, createdOn, text }) {
  return (
    <>
      <div>
        <Link to={`/post/${postId}`}>{postTitle}</Link>
      </div>
      <div>
        {user && <Link to={`/user/${user}`}>{user}</Link>} {createdOn}
      </div>
      <div>{text}</div>
    </>
  );
}

export default Comment;
