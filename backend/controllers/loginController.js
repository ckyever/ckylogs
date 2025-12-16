import { constants } from "http2";
import { getUser } from "../models/userModel.js";
import { compare } from "bcryptjs";

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if ((username, password)) {
    const user = await getUser(username);
    if (user) {
      const isValidCredentials = await compare(password, user.password);
      if (isValidCredentials) {
        return res.json("CKYTODO: Create the jwt");
      } else {
        return res
          .status(constants.HTTP_STATUS_UNAUTHORIZED)
          .json({ message: "You're not allowed here" });
      }
    } else {
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "We couldn't get your user" });
    }
  } else {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "You're missing credentials" });
  }
};

export { loginUser };
