import express, { Router } from "express";
import {
	createKelas,
	getKelas,
	getKelasById,
	softDeleteKelas,
	updateKelas,
} from "domain/kelas/controller";
import {
	isAdmin,
	isAuthenticated,
	validateKelas,
} from "middleware/index.middleware";

const kelasRouter: Router = express.Router();

kelasRouter.get("/", isAuthenticated, getKelas);
kelasRouter.post("/", isAuthenticated, isAdmin, validateKelas, createKelas);
kelasRouter.get("/:id", isAuthenticated, isAdmin, getKelasById);
kelasRouter.put("/:id", isAuthenticated, isAdmin, validateKelas, updateKelas);
kelasRouter.delete("/:id", isAuthenticated, isAdmin, softDeleteKelas);

export default kelasRouter;
