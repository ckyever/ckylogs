import { Router } from "express";
import {
  createPost,
  updatePost,
  likePost,
  deletePost,
} from "../controllers/postController.js";

const protectedPostRouter = Router();
protectedPostRouter.post("/", createPost);
protectedPostRouter.put("/:id", updatePost);
protectedPostRouter.post("/:postId/like", likePost);
protectedPostRouter.delete("/:postId", deletePost);

export { protectedPostRouter };
