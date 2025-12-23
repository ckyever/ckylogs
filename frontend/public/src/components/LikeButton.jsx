import { useState } from "react";
import { useOutletContext } from "react-router";

function LikeButton({ postId, userLikes }) {
  const { userToken, userId } = useOutletContext();
  const [isLiked, setIsLiked] = useState(
    userLikes.some((like) => like.user_id == userId)
  );
  const [likeCount, setLikeCount] = useState(userLikes.length);

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
      setLikeCount((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={handleLike}>
        {likeCount} {isLiked ? "Liked" : "Like"}
      </button>
    </>
  );
}

export default LikeButton;
