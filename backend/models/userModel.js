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

const getUser = async (username) => {
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

export { insertUser, getUser };
