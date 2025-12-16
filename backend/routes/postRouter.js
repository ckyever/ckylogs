import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  getAuthorPosts,
} from "../controllers/postController.js";

const postRouter = Router();
postRouter.post("/", createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);
postRouter.get("/author/:id", getAuthorPosts);

export { postRouter };
