import {
	getUserById,
	getUserByUsername,
	getUsers,
	login,
	logout,
	register,
	updateUser,
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
authRouter.get("/users/:id", isAuthenticated, isAdmin, getUserById);
authRouter.put(
	"/users/:id",
	isAuthenticated,
	isAdmin,
	validateRegister,
	updateUser
);

export default authRouter;
