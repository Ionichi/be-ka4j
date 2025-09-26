import express, { Router } from "express";
import {
	createSeason,
	deleteSeason,
	getLatestSeason,
	getSeason,
} from "domain/settings/controller";
import {
	isAdmin,
	isAuthenticated,
	validateSeason,
} from "middleware/index.middleware";

const settingsRouter: Router = express.Router();

settingsRouter.get("/season", isAuthenticated, isAdmin, getSeason);
settingsRouter.get("/season/latest", isAuthenticated, isAdmin, getLatestSeason);
settingsRouter.post(
	"/season",
	isAuthenticated,
	isAdmin,
	validateSeason,
	createSeason
);
settingsRouter.delete("/season/:id", isAuthenticated, isAdmin, deleteSeason);

export default settingsRouter;
