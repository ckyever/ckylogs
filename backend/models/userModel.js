import { prisma } from "../lib/prisma.js";

const insertUser = async (username, password) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    return newUser;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserByUsername = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getUserDetails = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select: {
        username: true,
        is_author: true,
        posts: true,
        comments: true,
      },
    });
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const isUserAnAuthor = async (userId) => {
  try {
    const result = await prisma.user.findUnique({
      select: {
        is_author: true,
      },
      where: {
        id: userId,
      },
    });
    return result ? result.is_author : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { insertUser, getUserDetails, getUserByUsername, isUserAnAuthor };
