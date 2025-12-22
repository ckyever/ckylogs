import { prisma } from "../lib/prisma.js";

const insertLikedPost = async (postId, userId) => {
  try {
    const likedPost = await prisma.liked_post.create({
      data: {
        post_id: Number(postId),
        user_id: Number(userId),
      },
    });
    return likedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { insertLikedPost };
