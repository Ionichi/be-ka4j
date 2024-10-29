import express, { Router } from "express";
import {
	createKelas,
	deleteKelas,
	getKelas,
	getKelasById,
	updateKelas,
} from "domain/kelas/controller";
import {
	isAdmin,
	isAuthenticated,
	validateKelas,
} from "middleware/index.middleware";

const kelasRouter: Router = express.Router();

kelasRouter.get("/", isAuthenticated, isAdmin, getKelas);
kelasRouter.post("/", isAuthenticated, isAdmin, validateKelas, createKelas);
kelasRouter.get("/:id", isAuthenticated, isAdmin, getKelasById);
kelasRouter.put("/:id", isAuthenticated, isAdmin, validateKelas, updateKelas);
kelasRouter.delete("/:id", isAuthenticated, isAdmin, deleteKelas);

export default kelasRouter;
