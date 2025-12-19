import { Router } from "express";
import {
  createUser,
  getUser,
  getUsername,
} from "../controllers/userController.js";

const userRouter = Router();
userRouter.post("/", createUser);
userRouter.get("/:username", getUser);
userRouter.get("/username/:username", getUsername);

export { userRouter };
