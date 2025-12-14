import { Router } from "express";
import { createPost } from "../controllers/postController.js";

const postRouter = Router();
postRouter.post("/", createPost);

export { postRouter };
