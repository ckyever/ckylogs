import { Router } from "express";
import { getComments } from "../controllers/commentController.js";

const commentRouter = Router();
commentRouter.get("/user/:username", getComments);

export { commentRouter };
