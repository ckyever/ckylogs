import { Link } from "react-router";

function PostSummary({ id, title, author, createdOn, body }) {
  return (
    <Link to={`post/${id}`}>
      <h2>{title}</h2>
      <Link to={`user/${author}`}>{author}</Link>
      <div>{createdOn}</div>
      <p>{body}</p>
    </Link>
  );
}

export default PostSummary;
