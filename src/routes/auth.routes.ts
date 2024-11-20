import { getUser, login, logout, register } from "domain/user/controller";
import express, { Router } from "express";
import {
	isAdmin,
	isAuthenticated,
	validateLogin,
	validateRegister,
} from "middleware/index.middleware";

const authRouter: Router = express.Router();

authRouter.post("/login", validateLogin, login);
authRouter.post(
	"/register",
	isAuthenticated,
	isAdmin,
	validateRegister,
	register
);
authRouter.post("/check-auth", isAuthenticated, getUser);
authRouter.post("/check-admin", isAuthenticated, isAdmin, getUser);
authRouter.post("/logout", isAuthenticated, logout);

export default authRouter;
