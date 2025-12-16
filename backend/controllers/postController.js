import { constants } from "http2";
import { insertPost } from "../models/postModel.js";

const createPost = async (req, res) => {
  const { title, body } = req.body;

  if (title && body) {
    const newPost = await insertPost(title, body, req.user.id);
    if (newPost) {
      return res.json({ message: "Post has been created", post: newPost });
    } else {
      return res
        .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
        .json({ message: "We couldn't create your post" });
    }
  } else {
    return res
      .status(constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: "You're missing something" });
  }
};

export { createPost };
