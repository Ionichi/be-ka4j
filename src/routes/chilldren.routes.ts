import {
	createChildren,
	getChildren,
	getChildrenById,
	softDeleteChildren,
	updateChildren,
} from "domain/children/controller";
import express, { Router } from "express";
import { isAuthenticated, validateChildren } from "middleware/index.middleware";

const childrenRouter: Router = express.Router();

childrenRouter.get("/", isAuthenticated, getChildren);
childrenRouter.post("/", isAuthenticated, validateChildren, createChildren);
childrenRouter.get("/:id", isAuthenticated, getChildrenById);
childrenRouter.put("/:id", isAuthenticated, validateChildren, updateChildren);
childrenRouter.delete("/:id", isAuthenticated, softDeleteChildren);

export default childrenRouter;
