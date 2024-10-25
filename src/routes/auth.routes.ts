import { login, logout, register } from "domain/user/controller";
import express, { Router } from "express";
import isAdmin from "middleware/admin.middleware";
import isAuthenticated from "middleware/auth.middleware";
import validateLogin from "middleware/login.middleware";
import validateRegister from "middleware/register.middleware";

const authRouter: Router = express.Router();

authRouter.post("/login", validateLogin, login);
authRouter.post(
	"/register",
	isAuthenticated,
	isAdmin,
	validateRegister,
	register
);
authRouter.post("/logout", isAuthenticated, logout);

export default authRouter;
