import express, { Router } from "express";
import authRouter from "./auth.routes";
import kelasRouter from "./kelas.routes";

const router: Router = express.Router();

const routes = [
	{
		path: "/auth",
		route: authRouter,
	},
	{
		path: "/kelas",
		route: kelasRouter,
	},
];

routes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
