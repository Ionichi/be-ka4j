import { LogType } from "@prisma/client";
import LogService from "domain/log/service";
import { Request, Response } from "express";
import AbsensiMentorService from "./service";

const getAbsensiMentor = async (req: Request, res: Response) => {
	try {
		const tgl = req.query.tgl as string;
		const result = await AbsensiMentorService.getAbsensiMentor(tgl);

		res.status(200).json({
			success: true,
			message: result.message,
			data: {
				absensiMentor: result.absensiMentor,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"get",
				"get absensi mentor",
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

const storeAbsensiMentor = async (req: Request, res: Response) => {
	try {
		const { tgl, data } = req.body;

		const result = await AbsensiMentorService.storeAbsensiMentor(tgl, data);

		await LogService.createLog(
			"save",
			"save absensi mentor",
			`save absensi mentor ${tgl}`,
			LogType.SUCCESS,
			req.body.currentUsername
		);

		res.status(201).json({
			success: true,
			message: result.message,
			data: {
				absensiMentor: result.absensiMentor,
			},
		});
	} catch (error) {
		if (error instanceof Error) {
			await LogService.createLog(
				"save",
				`save absensi mentor ${req.body.tgl}`,
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

export { getAbsensiMentor, storeAbsensiMentor };
