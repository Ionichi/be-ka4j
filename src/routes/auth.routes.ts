import {
	getUserByUsername,
	getUsers,
	login,
	logout,
	register,
} from "domain/user/controller";
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
authRouter.post("/validate", isAuthenticated, getUserByUsername);
authRouter.post("/logout", isAuthenticated, logout);
authRouter.get("/users", isAuthenticated, isAdmin, getUsers);

export default authRouter;
