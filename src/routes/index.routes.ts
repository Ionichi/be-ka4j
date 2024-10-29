import express, { Router } from "express";
import authRouter from "./auth.routes";
import kelasRouter from "./kelas.routes";
import childrenRouter from "./chilldren.routes";

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
	{
		path: "/children",
		route: childrenRouter,
	},
];

routes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
