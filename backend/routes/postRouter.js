import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/postController.js";

const postRouter = Router();
postRouter.post("/", createPost);
postRouter.get("/", getAllPosts);

export { postRouter };
