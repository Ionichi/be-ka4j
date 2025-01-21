import {
	getAbsensiChildren,
	storeAbsensiChildren,
} from "domain/absensi-children/controller";
import express, { Router } from "express";
import validateAbsensiChildren from "middleware/absensiChildren.middleware";
import isAdmin from "middleware/admin.middleware";
import isAuthenticated from "middleware/auth.middleware";

const absensiChildrenRouter: Router = express.Router();

absensiChildrenRouter.get("/", isAuthenticated, isAdmin, getAbsensiChildren);
absensiChildrenRouter.post(
	"/",
	isAuthenticated,
	isAdmin,
	validateAbsensiChildren,
	storeAbsensiChildren
);

export default absensiChildrenRouter;
