import { Router } from "express";
import {
  createComment,
  deleteComment,
} from "../controllers/commentController.js";

const protectedCommentRouter = Router();
protectedCommentRouter.post("/post/:id", createComment);
protectedCommentRouter.delete("/:id", deleteComment);

export { protectedCommentRouter };
