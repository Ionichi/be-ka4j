import { Request, Response } from "express";
import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
import KelasService from "./service";

const getKelas = async (req: Request, res: Response) => {
	try {
		const result = await KelasService.getKelas();

		res.status(200).json({
			success: true,
			message: "Data retrieved successfully.",
			data: {
				kelas: result,
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

export { getKelas, createKelas };
