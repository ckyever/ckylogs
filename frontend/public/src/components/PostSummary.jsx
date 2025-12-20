import Timestamp from "./Timestamp.jsx";
import { Link } from "react-router";

function PostSummary({ id, title, author, createdOn, body }) {
  return (
    <>
      <Link to={`/post/${id}`}>
        <h2>{title}</h2>
      </Link>
      <Link to={`/user/${author}`}>{author}</Link>
      <Timestamp dateTime={createdOn} />
      <Link to={`/post/${id}`}>
        <p>{body}</p>
      </Link>
    </>
  );
}

export default PostSummary;
