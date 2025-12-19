import { hash } from "bcryptjs";
import { constants } from "http2";
import jwt from "jsonwebtoken";
import { insertUser, getUserByUsername } from "../models/userModel.js";

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const SALT_ROUNDS = 10;
    const hashedPassword = await hash(password, SALT_ROUNDS);
    const newUser = await insertUser(username, hashedPassword);
    if (newUser) {
      jwt.sign(
        { newUser },
        process.env.SECRET_KEY,
        { expiresIn: "1 days" },
        (error, token) => {
          if (error) {
            console.error(error);
            return res
              .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
              .json({ message: "Failed to sign in" });
          } else {
            return res.json({
              message: "A user is born!",
              token,
              username: newUser.username,
            });
          }
        }
      );
    } else {
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "We couldn't create your user" });
    }
  } else {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "You're missing something" });
  }
};

const getUsername = async (req, res) => {
  const { username } = req.params;

  if (username) {
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return res.json({
        message: "Username already exists",
        isAvailable: false,
      });
    } else {
      return res.json({ message: "Username is available", isAvailable: true });
    }
  } else {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "You're missing something" });
  }
};

export { createUser, getUsername };
