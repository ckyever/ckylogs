import { Link } from "react-router";

function PostSummary({ title, author, createdOn, body }) {
  return (
    <>
      <h2>{title}</h2>
      <Link to={`user/${author}`}>{author}</Link>
      <div>{createdOn}</div>
      <p>{body}</p>
    </>
  );
}

export default PostSummary;
