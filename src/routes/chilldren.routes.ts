import { createChildren, getChildren } from "domain/children/controller";
import express, { Router } from "express";
import { isAuthenticated, validateChildren } from "middleware/index.middleware";

const childrenRouter: Router = express.Router();

childrenRouter.get("/", isAuthenticated, getChildren);
childrenRouter.post("/", isAuthenticated, validateChildren, createChildren);
childrenRouter.get("/:id", isAuthenticated);
childrenRouter.put("/:id", isAuthenticated, validateChildren);
childrenRouter.delete("/:id", isAuthenticated);

export default childrenRouter;
