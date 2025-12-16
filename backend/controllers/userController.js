import { hash } from "bcryptjs";
import { constants } from "http2";
import { insertUser } from "../models/userModel.js";

const createUser = async (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const SALT_ROUNDS = 10;
    const hashedPassword = await hash(password, SALT_ROUNDS);
    const newUser = await insertUser(username, hashedPassword);
    if (newUser) {
      return res.json({ message: "A user is born", user: newUser });
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

export { createUser };
