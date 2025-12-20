import { Link } from "react-router";

function Comment({ user, createdOn, text }) {
  return (
    <>
      <div>
        <Link to={`/user/${user}`}>{user}</Link> {createdOn}
      </div>
      <div>{text}</div>
    </>
  );
}

export default Comment;
