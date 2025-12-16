import { insertComment } from "../models/commentModel.js";

const createComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const comment = await insertComment(id, req.user.id, text);

  if (comment) {
    return res.json({
      message: `User ID - ${req.user.id}, added a comment to post ID - ${id}`,
      comment,
    });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "We couldn't create the comment" });
  }
};

export { createComment };
