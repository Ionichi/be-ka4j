import express, { Router } from "express";
import authRouter from "./auth.routes";
import kelasRouter from "./kelas.routes";
import childrenRouter from "./chilldren.routes";
import absensiMentorRouter from "./absensiMentor.routes";
import absensiChildrenRouter from "./absensiChildren.routes";
import dashboardRouter from "./dashboard.routes";
import settingsRouter from "./settings.routes";

const router: Router = express.Router();

const routes = [
	{
		path: "/auth",
		route: authRouter,
	},
	{
		path: "/absensi-mentor",
		route: absensiMentorRouter,
	},
	{
		path: "/absensi-children",
		route: absensiChildrenRouter,
	},
	{
		path: "/children",
		route: childrenRouter,
	},
	{
		path: "/dashboard",
		route: dashboardRouter,
	},
	{
		path: "/kelas",
		route: kelasRouter,
	},
	{
		path: "/settings",
		route: settingsRouter,
	},
];

routes.forEach((route) => {
	router.use(route.path, route.route);
});

export default router;
