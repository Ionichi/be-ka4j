import {
	getAbsensiMentor,
	storeAbsensiMentor,
} from "domain/absensi-mentor/controller";
import express, { Router } from "express";
import isAdmin from "middleware/admin.middleware";
import isAuthenticated from "middleware/auth.middleware";

const absensiMentorRouter: Router = express.Router();

absensiMentorRouter.get("/", isAuthenticated, isAdmin, getAbsensiMentor);
absensiMentorRouter.post("/", isAuthenticated, isAdmin, storeAbsensiMentor);

export default absensiMentorRouter;
