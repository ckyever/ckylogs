import { useState } from "react";
import { useOutletContext } from "react-router";

function LikeButton({ postId, userLikes }) {
  const { userToken, username } = useOutletContext();
  const [isLiked, setIsLiked] = useState(userLikes.includes(username)); // CKYTODO Needs to be the user id

  const handleLike = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/post/${postId}/like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setIsLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  const likeCount = userLikes.length + (isLiked ? 1 : 0);

  return (
    <>
      <button onClick={handleLike}>
        {likeCount} {isLiked ? "Liked" : "Like"}
      </button>
    </>
  );
}

export default LikeButton;
