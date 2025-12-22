import { Router } from "express";
import {
  createPost,
  updatePost,
  likePost,
} from "../controllers/postController.js";

const protectedPostRouter = Router();
protectedPostRouter.post("/", createPost);
protectedPostRouter.put("/:id", updatePost);
protectedPostRouter.post("/:postId/like", likePost);

export { protectedPostRouter };
