import express, { Router } from "express";
import { createKelas, getKelas, getKelasById } from "domain/kelas/controller";
import isAdmin from "middleware/admin.middleware";
import isAuthenticated from "middleware/auth.middleware";
import validateKelas from "middleware/kelas.middleware";

const kelasRouter: Router = express.Router();

kelasRouter.get("/", isAuthenticated, isAdmin, getKelas);
kelasRouter.get("/:id", isAuthenticated, isAdmin, getKelasById);
kelasRouter.post("/", isAuthenticated, isAdmin, validateKelas, createKelas);

export default kelasRouter;
