import {
	getAbsensiMentor,
	storeAbsensiMentor,
} from "domain/absensi-mentor/controller";
import express, { Router } from "express";
import {
	isAdmin,
	isAuthenticated,
	validateAbsensiMentor,
} from "middleware/index.middleware";

const absensiMentorRouter: Router = express.Router();

absensiMentorRouter.get("/", isAuthenticated, isAdmin, getAbsensiMentor);
absensiMentorRouter.post(
	"/",
	isAuthenticated,
	isAdmin,
	validateAbsensiMentor,
	storeAbsensiMentor
);

export default absensiMentorRouter;
