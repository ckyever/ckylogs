import { Router } from "express";
import {
  createPost,
  updatePost,
  likePost,
} from "../controllers/postController.js";

const protectedPostRouter = Router();
protectedPostRouter.post("/", createPost);
protectedPostRouter.put("/:id", updatePost);
protectedPostRouter.put("/:id/like", likePost);

export { protectedPostRouter };
