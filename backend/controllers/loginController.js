import { compare } from "bcryptjs";
import { constants } from "http2";
import jwt from "jsonwebtoken";
import { getUserByUsername } from "../models/userModel.js";

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if ((username, password)) {
    const user = await getUserByUsername(username);
    if (user) {
      const isValidCredentials = await compare(password, user.password);
      if (isValidCredentials) {
        jwt.sign(
          { user },
          process.env.SECRET_KEY,
          { expiresIn: "1 days" },
          (error, token) => {
            if (error) {
              console.error(error);
              return res
                .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
                .json({ message: "Failed to get token" });
            } else {
              return res.json({
                message: "You're in!",
                token,
                username: user.username,
                userId: user.id,
                isAuthor: user.is_author,
              });
            }
          }
        );
      } else {
        return res
          .status(constants.HTTP_STATUS_UNAUTHORIZED)
          .json({ message: "You're not allowed here" });
      }
    } else {
      return res
        .status(constants.HTTP_STATUS_UNAUTHORIZED)
        .json({ message: "You're not allowed here" });
    }
  } else {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "You're missing credentials" });
  }
};

export { loginUser };
