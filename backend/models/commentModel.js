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

const doesCommentExist = async (commentId) => {
  try {
    const result = await prisma.comment.findUnique({
      select: {
        id: true,
      },
      where: {
        id: Number(commentId),
      },
    });
    return result ? result.id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserComments = async (username) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        comments: true,
      },
    });
    return result ? result.comments : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCommentsByPostId = async (postId) => {
  try {
    const result = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      include: {
        comments: true,
      },
    });
    return result ? result.comments : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getCommentUserId = async (commentId) => {
  try {
    const result = await prisma.comment.findUnique({
      select: {
        user_id: true,
      },
      where: {
        id: Number(commentId),
      },
    });
    return result ? result.user_id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deleteCommentById = async (commentId) => {
  try {
    const comment = await prisma.comment.delete({
      where: {
        id: Number(commentId),
      },
    });
    return comment;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  insertComment,
  doesCommentExist,
  getUserComments,
  getCommentsByPostId,
  getCommentUserId,
  deleteCommentById,
};
