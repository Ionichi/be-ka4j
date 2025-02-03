import {
	getAbsensiChildren,
	storeAbsensiChildren,
} from "domain/absensi-children/controller";
import express, { Router } from "express";
import validateAbsensiChildren from "middleware/absensiChildren.middleware";
import isAuthenticated from "middleware/auth.middleware";

const absensiChildrenRouter: Router = express.Router();

absensiChildrenRouter.get("/", isAuthenticated, getAbsensiChildren);
absensiChildrenRouter.post(
	"/",
	isAuthenticated,
	validateAbsensiChildren,
	storeAbsensiChildren
);

export default absensiChildrenRouter;
