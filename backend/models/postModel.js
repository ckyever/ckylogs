import { prisma } from "../lib/prisma.js";

const insertPost = async (title, body, authorId) => {
  try {
    const newPost = await prisma.post.create({
      data: {
        title: title,
        body: body,
        author_id: authorId,
      },
    });
    return newPost;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        created_on: "desc",
      },
      include: {
        author: true,
      },
    });
    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getPostById = async (postId) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(postId),
      },
      include: {
        comments: true,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getPostsByAuthorUsername = async (username) => {
  try {
    const result = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        posts: true,
      },
    });
    return result ? result.posts : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updatePostById = async (postId, title, body) => {
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(postId),
      },
      data: {
        title: title,
        body: body,
      },
    });
    return post;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const doesPostExist = async (postId) => {
  try {
    const result = await prisma.post.findUnique({
      select: {
        id: true,
      },
      where: {
        id: Number(postId),
      },
    });
    return result ? result.id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getPostAuthorId = async (postId) => {
  try {
    const result = await prisma.post.findUnique({
      select: {
        author_id: true,
      },
      where: {
        id: Number(postId),
      },
    });
    return result ? result.author_id : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export {
  insertPost,
  getPosts,
  getPostById,
  getPostsByAuthorUsername,
  updatePostById,
  doesPostExist,
  getPostAuthorId,
};
