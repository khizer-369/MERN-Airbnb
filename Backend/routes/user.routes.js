import express from "express";
import {
  getUser,
  login,
  logOut,
  signUp,
} from "../controllers/user.controllers.js";
import auth from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.post("/sign-up", signUp);

userRouter.post("/login", login);

userRouter.post("/log-out", logOut);

userRouter.post("/get-user", auth, getUser);

export default userRouter;
