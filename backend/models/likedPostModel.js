import { prisma } from "../lib/prisma.js";

const doesLikedPostExist = async (postId, userId) => {
  try {
    const likedPost = await prisma.liked_post.findUnique({
      where: {
        post_id_user_id: {
          post_id: Number(postId),
          user_id: Number(userId),
        },
      },
    });
    return likedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

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

const deleteLikedPost = async (postId, userId) => {
  try {
    const likedPost = await prisma.liked_post.delete({
      where: {
        post_id_user_id: {
          post_id: Number(postId),
          user_id: Number(userId),
        },
      },
    });
    return likedPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { doesLikedPostExist, insertLikedPost, deleteLikedPost };
