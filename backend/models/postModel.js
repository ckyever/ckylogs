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

export { insertPost };
