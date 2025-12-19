import { Router } from "express";
import { createPost, updatePost } from "../controllers/postController.js";

const protectedPostRouter = Router();
protectedPostRouter.post("/", createPost);
protectedPostRouter.put("/:id", updatePost);

export { protectedPostRouter };
