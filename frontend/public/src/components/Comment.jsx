function Comment({ user, createdOn, text }) {
  return (
    <>
      <div>
        <span>{user}</span> <span>{createdOn}</span>
      </div>
      <div>{text}</div>
    </>
  );
}

export default Comment;
