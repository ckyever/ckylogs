import { Router } from "express";
import {
  getAllPosts,
  getPost,
  getAuthorPosts,
} from "../controllers/postController.js";

const postRouter = Router();
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);
postRouter.get("/author/:id", getAuthorPosts);

export { postRouter };
