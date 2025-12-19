function PostSummary({ title, author, createdOn, body }) {
  return (
    <>
      <h2>{title}</h2>
      <div>{author}</div>
      <div>{createdOn}</div>
      <p>{body}</p>
    </>
  );
}

export default PostSummary;
