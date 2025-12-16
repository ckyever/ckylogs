import { Router } from "express";
import {
  createComment,
  deleteComment,
} from "../controllers/commentController.js";

const commentRouter = Router();
commentRouter.post("/post/:id", createComment);
commentRouter.delete("/:id", deleteComment);

export { commentRouter };
