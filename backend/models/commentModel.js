import { prisma } from "../lib/prisma.js";

const insertComment = async (postId, userId, text) => {
  try {
    const newComment = await prisma.comment.create({
      data: {
        post_id: Number(postId),
        user_id: Number(userId),
        text: text,
      },
    });
    return newComment;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { insertComment };
