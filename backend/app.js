import express from "express";
import { authenticateToken } from "./middleware/authentication.js";
import { commentRouter } from "./routes/commentRouter.js";
import { loginRouter } from "./routes/loginRouter.js";
import { postRouter } from "./routes/postRouter.js";
import { userRouter } from "./routes/userRouter.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Unprotected Routes
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);

// Protected Routes
app.use(authenticateToken);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Last updated ${new Date().toISOString()}`);
});
