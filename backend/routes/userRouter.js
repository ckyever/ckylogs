import { Router } from "express";
import { createUser, getUsername } from "../controllers/userController.js";

const userRouter = Router();
userRouter.post("/", createUser);
userRouter.get("/:username", getUsername);

export { userRouter };
