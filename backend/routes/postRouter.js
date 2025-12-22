import { Router } from "express";
import {
  getAllPosts,
  getPost,
  getAuthorPosts,
  getPostComments,
  likePost,
} from "../controllers/postController.js";

const postRouter = Router();
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);
postRouter.get("/:id/comments", getPostComments);
postRouter.get("/author/:username", getAuthorPosts);
postRouter.get("/:postId/like/:userId", likePost);

export { postRouter };
