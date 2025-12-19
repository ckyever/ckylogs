import { constants } from "http2";
import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearerToken = bearerHeader.split(" ")[1];
    if (bearerToken) {
      req.token = bearerToken;
      jwt.verify(bearerToken, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
          res
            .status(constants.HTTP_STATUS_FORBIDDEN)
            .json({ message: "Unauthorised access" });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } else {
      res
        .status(constants.HTTP_STATUS_UNAUTHORIZED)
        .json({ message: "Missing bearer token" });
    }
  } else {
    res
      .status(constants.HTTP_STATUS_FORBIDDEN)
      .json({ message: "You are not authorised" });
  }
};

export { authenticateToken };
