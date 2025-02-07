import { getData } from "domain/dashboard/controller";
import express, { Router } from "express";
import { isAuthenticated } from "middleware/index.middleware";

const dashboardRouter: Router = express.Router();

dashboardRouter.get("/", isAuthenticated, getData);

export default dashboardRouter;
