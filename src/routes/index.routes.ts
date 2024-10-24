import express, { Router } from "express";
import authRouter from "./auth.routes";

const router: Router = express.Router();

const routes = [
	{
		path: "/auth",
		route: authRouter,
	},
];

routes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
