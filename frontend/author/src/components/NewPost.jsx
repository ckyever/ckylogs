import { StatusCodes } from "http-status-codes";
import { useState } from "react";
import { useOutletContext } from "react-router";

function NewPost({ setNewPostCount }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { userToken } = useOutletContext();

  const dialog = document.getElementById("newPostDialog");
  if (dialog) {
    if (isDialogOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ title: title, body: body }),
      });

      if (response.status === StatusCodes.UNAUTHORIZED) {
        setErrorMessage("You are not authorised to create a post");
        return;
      }

      if (!response.ok) {
        setErrorMessage("Something went wrong");
        throw new Error(`Response status: ${response.status}`);
      }
      setNewPostCount((prev) => prev + 1);
      setIsDialogOpen(false);
    } catch (error) {
      setErrorMessage("Failed to create this post");
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIsDialogOpen((prev) => !prev);
        }}
      >
        New Post
      </button>
      <dialog id="newPostDialog">
        <form onSubmit={(event) => handleSubmit(event)}>
          <h2>
            <input
              type="text"
              name="title"
              aria-label="post title"
              placeholder="Eye-catching title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </h2>
          <textarea
            name="body"
            aria-label="post body"
            placeholder="Write something interesting..."
            required
            rows="10"
            value={body}
            onChange={(event) => setBody(event.target.value)}
          ></textarea>
          <div>
            <button type="submit">Post</button>
            <button onClick={() => setIsDialogOpen(false)} type="button">
              Cancel
            </button>
          </div>
          {errorMessage && <div>{errorMessage}</div>}
        </form>
      </dialog>
    </>
  );
}

export default NewPost;
