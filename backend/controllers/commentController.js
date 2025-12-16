import { constants } from "http2";
import {
  insertComment,
  doesCommentExist,
  deleteCommentById,
  getCommentUserId,
} from "../models/commentModel.js";

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

const deleteComment = async (req, res) => {
  const { id } = req.params;

  const commentId = await doesCommentExist(id);
  if (!commentId) {
    return res
      .status(constants.HTTP_STATUS_NOT_FOUND)
      .json({ message: "That comment doesn't exist" });
  }

  const userId = await getCommentUserId(commentId);
  if (userId) {
    if (userId != req.user.id) {
      return res
        .status(constants.HTTP_STATUS_FORBIDDEN)
        .json({ message: "You can't delete another user's comment" });
    }
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "Unable to delete this comment" });
  }

  const comment = await deleteCommentById(commentId);
  if (comment) {
    return res.json({
      message: `Delete comment ID - ${commentId}`,
      comment,
    });
  } else {
    return res
      .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      .json({ message: "We couldn't delete the comment" });
  }
};

export { createComment, deleteComment };
