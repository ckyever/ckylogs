import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPost,
} from "../controllers/postController.js";

const postRouter = Router();
postRouter.post("/", createPost);
postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);

export { postRouter };
