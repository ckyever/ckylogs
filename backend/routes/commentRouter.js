import { Router } from "express";
import { createComment } from "../controllers/commentController.js";

const commentRouter = Router();
commentRouter.post("/", createComment);

export { commentRouter };
