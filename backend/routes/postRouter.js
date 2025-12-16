import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  getAuthorPosts,
  updatePost,
} from "../controllers/postController.js";

const postRouter = Router();
postRouter.post("/", createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);
postRouter.put("/:id", updatePost);
postRouter.get("/author/:id", getAuthorPosts);

export { postRouter };
