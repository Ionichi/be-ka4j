import { Request, Response } from "express";
import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
import KelasService from "./service";

const getKelas = async (req: Request, res: Response) => {
	try {
		const result = await KelasService.getKelas();

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				kelas: result.kelas,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get kelas",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const getKelasById = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await KelasService.getKelasById(id);

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				kelas: result.kelas,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"edit",
				"edit kelas",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const createKelas = async (req: Request, res: Response) => {
	try {
		const { nama } = req.body;
		const result = await KelasService.createKelas(nama);

		await LogService.createLog(
			"save",
			"create kelas",
			`create kelas ${nama}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(201).json({
			success: true,
			message: result.message,
			data: {
				kelas: result.kelas,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"save",
				"create kelas",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const updateKelas = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { nama } = req.body;
		const result = await KelasService.updateKelas(id, nama);

		await LogService.createLog(
			"update",
			"update kelas",
			`update kelas ${nama}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				kelas: result.kelas,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"update",
				"update kelas",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

const deleteKelas = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const result = await KelasService.deleteKelas(id);

		await LogService.createLog(
			"delete",
			"delete kelas",
			`delete kelas ${result.kelas.nama}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				kelas: result.kelas,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"delete",
				"delete kelas",
				error.message,
				LogType.ERROR,
				req.body.currentUsername
			);
			res.status(500).json({
				success: false,
				message: error.message,
			});
		}
	}
};

export { getKelas, getKelasById, createKelas, updateKelas, deleteKelas };
